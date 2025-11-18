// src/tests/App.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";

describe("App", () => {
  test("affiche la page d'accueil dans le Layout sur la route /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // On teste un élément typique de la Home : la carte "Froid"
    expect(screen.getByText(/Froid/i)).toBeInTheDocument();
  });
});
