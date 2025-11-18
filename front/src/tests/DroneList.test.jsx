// front/src/tests/DroneList.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import DroneList from "../pages/DroneList/DroneList";

// 💡 On va mocker le module qui fournit getAllDrones
vi.mock("../services/api", () => ({
  getAllDrones: vi.fn(),
}));

// On récupère la fonction mockée
import { getAllDrones } from "../services/api";

const mockDrones = [
  {
    id: 1,
    name: "Drone Froid",
    model: "DF-100",
    price: 15000,
    image_path: "drones/drone-froid.png",
  },
  {
    id: 2,
    name: "Drone Chaud",
    model: "DC-200",
    price: 20000,
    image_path: "drones/drone-chaud.png",
  },
];

describe("DroneList", () => {
  beforeEach(() => {
    // Chaque test : l'API renvoie la liste simulée
    getAllDrones.mockResolvedValue(mockDrones);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("affiche le titre et le texte d'introduction", async () => {
    render(
      <MemoryRouter>
        <DroneList />
      </MemoryRouter>
    );

    // Titre principal
    expect(
      screen.getByText("Nos choix de drones")
    ).toBeInTheDocument();

    // Texte d'intro
    expect(
      screen.getByText(/Nous vous proposons différents types de drones de livraisons/i)
    ).toBeInTheDocument();
  });

  test("affiche la liste des drones récupérés depuis l'API", async () => {
    render(
      <MemoryRouter>
        <DroneList />
      </MemoryRouter>
    );

    // On attend que les drones mockés soient affichés
    expect(await screen.findByText("Drone Froid")).toBeInTheDocument();
    expect(await screen.findByText("Drone Chaud")).toBeInTheDocument();

    // Prix
    expect(screen.getByText(/15000 Francs/)).toBeInTheDocument();
    expect(screen.getByText(/20000 Francs/)).toBeInTheDocument();

    // Modèles
    expect(screen.getByText("DF-100")).toBeInTheDocument();
    expect(screen.getByText("DC-200")).toBeInTheDocument();
  });

  test("crée un lien vers la page produit pour chaque drone", async () => {
    render(
      <MemoryRouter>
        <DroneList />
      </MemoryRouter>
    );

    // Attendre que la liste soit chargée
    await screen.findByText("Drone Froid");

    const linkFroid = screen.getByRole("link", { name: /Drone Froid/i });
    const linkChaud = screen.getByRole("link", { name: /Drone Chaud/i });

    expect(linkFroid).toHaveAttribute("href", "/product/1");
    expect(linkChaud).toHaveAttribute("href", "/product/2");
  });
});
