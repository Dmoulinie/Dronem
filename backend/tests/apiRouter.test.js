// tests/apiRouter.test.js
import { describe, test, expect, vi } from "vitest";

// On mock express AVANT d'importer apiRouter.js
vi.mock("express", () => {
  const routerMock = {
    get: vi.fn(),
    post: vi.fn(),
  };

  return {
    __esModule: true,
    // ce qui sera importé avec "import express from 'express'"
    default: {
      Router: () => routerMock,
    },
    // export named pour accéder au mock dans le test
    routerMock,
  };
});

// Maintenant on peut importer les contrôleurs réels
import droneCtrl from "../routes/droneCtrl.js";
import cartCtrl from "../routes/cartCtrl.js";
import userCtrl from "../routes/userCtrl.js";

// Et surtout, on importe le router APRÈS le mock d'express
import { router } from "../apiRouter.js"; // même nom que ton fichier que tu as montré
import { routerMock } from "express"; // récupéré depuis le mock ci-dessus

describe("apiRouter configuration", () => {
  test("déclare les routes drones avec les bons handlers", () => {
    // /drones/getDrones
    expect(routerMock.get).toHaveBeenCalledWith(
      "/drones/getDrones",
      droneCtrl.getDrones
    );

    // /drones/getDroneById/:id
    expect(routerMock.get).toHaveBeenCalledWith(
      "/drones/getDroneById/:id",
      droneCtrl.getDroneById
    );
  });

  test("déclare les routes panier avec les bons handlers", () => {
    // GET /carts/getCartById/:id
    expect(routerMock.get).toHaveBeenCalledWith(
      "/carts/getCartById/:id",
      cartCtrl.getCartById
    );

    // POST /carts/addToCart
    expect(routerMock.post).toHaveBeenCalledWith(
      "/carts/addToCart",
      cartCtrl.addToCart
    );
  });

  test("déclare les routes users (register / login) avec les bons handlers", () => {
    expect(routerMock.post).toHaveBeenCalledWith(
      "/users/register",
      userCtrl.register
    );

    expect(routerMock.post).toHaveBeenCalledWith(
      "/users/login",
      userCtrl.login
    );
  });
});
