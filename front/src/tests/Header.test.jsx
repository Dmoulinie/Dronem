// front/src/tests/Header.test.jsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Header from "../components/header/Header.jsx";

// On mock le composant Panier pour ne pas dépendre de son implémentation réelle
vi.mock("../components/panier/panier.jsx", () => ({
  default: ({ open, onClose }) => (
    <div
      data-testid="panier"
      data-open={open ? "true" : "false"}
      onClick={onClose}
    >
      Panier mock
    </div>
  ),
}));

describe("Header", () => {
  test("affiche le logo et les liens de navigation", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Logo
    const logo = screen.getByAltText("Logo Dronem");
    expect(logo).toBeInTheDocument();

    // Liens
    const accueilLink = screen.getByRole("link", { name: /Accueil/i });
    const listLink = screen.getByRole("link", { name: /Liste des drones/i });
    const contactLink = screen.getByRole("link", { name: /Contact/i });

    expect(accueilLink).toHaveAttribute("href", "/");
    expect(listLink).toHaveAttribute("href", "/listProducts");
    expect(contactLink).toHaveAttribute("href", "/contact");

    // Lien vers la page de connexion
    const userLink = screen.getByRole("link", { name: /User profile/i });
    expect(userLink).toHaveAttribute("href", "/connexion");
  });

  test("affiche le panier vide et permet d'ouvrir/fermer le composant Panier", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Panier mocké
    const panier = screen.getByTestId("panier");
    expect(panier).toHaveAttribute("data-open", "false");

    // Icône panier
    const cartIcon = screen.getByAltText(/Cart/i);
    expect(cartIcon).toBeInTheDocument();

    // Clic sur l'icône → ouvre le panier
    fireEvent.click(cartIcon);
    expect(panier).toHaveAttribute("data-open", "true");

    // Clic sur le panier lui-même → appelle onClose → referme
    fireEvent.click(panier);
    expect(panier).toHaveAttribute("data-open", "false");
  });
});
