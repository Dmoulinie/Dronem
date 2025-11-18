import { describe, test, expect, vi, beforeEach } from "vitest";

// On mock le module db.js
vi.mock("../db.js", () => {
  return {
    default: {
      get: vi.fn(),
      run: vi.fn(),
      all: vi.fn(),
    },
  };
});

// Une fois mocké, on peut importer le controller et le db mocké
import cartCtrl from "../routes/cartCtrl.js";
import db from "../db.js";

// Helper pour créer un faux res Express
function createMockRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
}

describe("cartCtrl.addToCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("retourne 400 si les paramètres ne sont pas des nombres", () => {
    const req = {
      body: {
        id_user: "abc",     // invalide
        id_drone: 1,
        delta: 1,
      },
    };
    const res = createMockRes();

    cartCtrl.addToCart(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "id_user, id_drone et delta doivent être des nombres",
    });
  });

  test("UPDATE la quantité si la ligne existe déjà", async () => {
    const req = {
      body: {
        id_user: 1,
        id_drone: 2,
        delta: 3, // +3
      },
    };
    const res = createMockRes();

    // db.get renvoie une ligne existante
    db.get.mockImplementation((sql, params, cb) => {
      cb(null, { quantity: 2 }); // quantité actuelle = 2
    });

    // db.run pour UPDATE
    db.run.mockImplementation((sql, params, cb) => {
      cb && cb(null);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        // on laisse le test vérifier après
        resolve(data);
      });

      cartCtrl.addToCart(req, res);
    });

    // currentQty = 2, delta = 3 → newQty = 5
    expect(db.run).toHaveBeenCalledWith(
      "UPDATE cart SET quantity = ? WHERE id_user = ? AND id_drone = ?",
      [5, 1, 2],
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id_user: 1,
      id_drone: 2,
      quantity: 5,
    });
  });

  test("INSERT une nouvelle ligne si aucune n'existe et delta > 0", async () => {
    const req = {
      body: {
        id_user: 1,
        id_drone: 3,
        delta: 2,
      },
    };
    const res = createMockRes();

    // db.get ne trouve pas de ligne
    db.get.mockImplementation((sql, params, cb) => {
      cb(null, undefined); // row = undefined
    });

    db.run.mockImplementation((sql, params, cb) => {
      cb && cb(null);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });
      cartCtrl.addToCart(req, res);
    });

    expect(db.run).toHaveBeenCalledWith(
      "INSERT INTO cart (id_user, id_drone, quantity) VALUES (?, ?, ?)",
      [1, 3, 2],
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id_user: 1,
      id_drone: 3,
      quantity: 2,
    });
  });
});

describe("cartCtrl.getCartById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("retourne 400 si l'id n'est pas un nombre", () => {
    const req = { params: { id: "abc" } };
    const res = createMockRes();

    cartCtrl.getCartById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "id must be a number" });
  });

  test("retourne les lignes du panier pour un userId valide", async () => {
    const req = { params: { id: "1" } };
    const res = createMockRes();

    const fakeRows = [
      { id_user: 1, id_drone: 2, quantity: 3 },
      { id_user: 1, id_drone: 4, quantity: 1 },
    ];

    db.all.mockImplementation((sql, params, cb) => {
      cb(null, fakeRows);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });

      cartCtrl.getCartById(req, res);
    });

    expect(db.all).toHaveBeenCalledWith(
      "SELECT * FROM cart WHERE id_user = ?",
      [1],
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeRows);
  });
});
