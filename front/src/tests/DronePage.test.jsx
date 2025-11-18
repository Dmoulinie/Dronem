import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DronePage from "../pages/DronePage/DronePage";
import { vi } from "vitest";

const mockDrone = {
  name: "Drone Test",
  model: "X1",
  category: "Froid",
  battery: "3000mAh",
  speed: 50,
  price: 20000,
  description: "Un drone incroyable",
  image_path: "drones/Drone1.png",
};

describe("DronePage", () => {
  beforeEach(() => {
    // Mock du fetch pour renvoyer notre faux drone
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(mockDrone),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Affiche le message de chargement au début", () => {
    render(
      <MemoryRouter initialEntries={["/drone/1"]}>
        <Routes>
          <Route path="/drone/:id" element={<DronePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/chargement du drone/i)
    ).toBeInTheDocument();
  });

  test("Affiche le nom du drone une fois chargé", async () => {
    render(
      <MemoryRouter initialEntries={["/drone/1"]}>
        <Routes>
          <Route path="/drone/:id" element={<DronePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Drone Test")
    ).toBeInTheDocument();
  });

  test("Affiche toutes les informations détaillées du drone", async () => {
    render(
      <MemoryRouter initialEntries={["/drone/1"]}>
        <Routes>
          <Route path="/drone/:id" element={<DronePage />} />
        </Routes>
      </MemoryRouter>
    );

    // On attend que le composant ait fini de charger
    await screen.findByText("Drone Test");

    // Modèle
    expect(screen.getByText(/modèle/i)).toBeInTheDocument();
    expect(screen.getByText("X1")).toBeInTheDocument();

    // Catégorie
    expect(screen.getByText(/catégorie/i)).toBeInTheDocument();
    expect(screen.getByText("Froid")).toBeInTheDocument();

    // Batterie
    expect(screen.getByText(/batterie/i)).toBeInTheDocument();
    expect(screen.getByText("3000mAh")).toBeInTheDocument();

    // Vitesse (avec km/h)
    expect(screen.getByText(/vitesse/i)).toBeInTheDocument();
    expect(screen.getByText(/50 km\/h/i)).toBeInTheDocument();

    // Prix (avec CFP)
    expect(screen.getByText(/prix/i)).toBeInTheDocument();
    expect(screen.getByText(/20000 CFP/i)).toBeInTheDocument();

    // Description
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByText("Un drone incroyable")
    ).toBeInTheDocument();
  });

  test("Affiche l'image du drone avec le bon src", async () => {
    render(
      <MemoryRouter initialEntries={["/drone/1"]}>
        <Routes>
          <Route path="/drone/:id" element={<DronePage />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("Drone Test");

    const img = screen.getByAltText("Drone Test");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "http://localhost:8080/public/drones/Drone1.png"
    );
  });
});
