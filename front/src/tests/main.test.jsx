import { describe, test, expect, vi } from "vitest";

// On définit le mock AVANT tout grâce à vi.hoisted
const { createRootMock } = vi.hoisted(() => {
  return {
    createRootMock: vi.fn(() => ({
      render: vi.fn(), // on n’a pas besoin de vérifier render ici
    })),
  };
});

// Mock du module 'react-dom/client'
vi.mock("react-dom/client", () => {
  return {
    __esModule: true,
    default: {
      createRoot: createRootMock, // ceci remplace ReactDOM.createRoot
    },
  };
});

describe("main.jsx", () => {
  test("monte correctement l'application React dans #root", async () => {
    // On simule le DOM cible
    document.body.innerHTML = `<div id="root"></div>`;
    const rootElement = document.getElementById("root");

    // On importe main.jsx APRÈS avoir défini les mocks
    await import("../main.jsx");

    // Vérifie que createRoot a bien été appelé une fois
    expect(createRootMock).toHaveBeenCalledTimes(1);

    // Et qu'il a été appelé avec l'élément #root
    expect(createRootMock.mock.calls[0][0]).toBe(rootElement);
  });
});
