// front/src/tests/Home.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/Home/Home";

describe("Home", () => {
  test("affiche les trois catégories Froid, Chaud et Boisson", () => {
    render(<Home />);

    expect(screen.getByText("Froid")).toBeInTheDocument();
    expect(screen.getByText("Chaud")).toBeInTheDocument();
    expect(screen.getByText("Boisson")).toBeInTheDocument();
  });

  test("affiche trois images de drones avec le bon alt", () => {
    render(<Home />);

    const img1 = screen.getByAltText("Drone 1");
    const img2 = screen.getByAltText("Drone 2");
    const img3 = screen.getByAltText("Drone 3");

    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
    expect(img3).toBeInTheDocument();

    const allImages = screen.getAllByRole("img");
    expect(allImages).toHaveLength(3);
  });
});
