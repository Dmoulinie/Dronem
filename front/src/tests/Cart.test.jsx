import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import DronePage from "../pages/DronePage/DronePage";

// On mock le fetch pour contrôler les données
const mockDrone = {
  name: "Drone Panier Test",
  model: "X1",
  category: "Froid",
  battery: "3000mAh",
  speed: 50,
  price: 20000,
  description: "Un drone pour tester le panier",
  image_path: "drones/Drone1.png",
};

describe("Panier - DronePage", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(mockDrone),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("clique sur 'Ajouter au panier' appelle onAddToCart avec le bon drone", async () => {
    const mockAddToCart = vi.fn();

    render(
      <MemoryRouter initialEntries={["/drone/1"]}>
        <Routes>
          <Route
            path="/drone/:id"
            element={<DronePage onAddToCart={mockAddToCart} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // On attend que les données soient chargées
    await screen.findByText("Drone Panier Test");

    const button = screen.getByText("Ajouter au panier");
    button.click();

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockDrone);
  });
});
