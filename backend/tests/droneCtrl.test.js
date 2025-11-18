import { describe, test, expect, vi, beforeEach } from "vitest";

// 🔧 Mock du module db.js
vi.mock("../db.js", () => {
  return {
    default: {
      all: vi.fn(),
      get: vi.fn(),
    },
  };
});

import droneCtrl from "../routes/droneCtrl.js";
import db from "../db.js";

// Petit helper pour simuler res d'Express
function createMockRes() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
}

describe("droneCtrl.getDrones", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("retourne la liste des drones avec status 200", async () => {
    const req = {}; // pas utilisé
    const res = createMockRes();

    const fakeRows = [
      { id: 1, name: "Drone Froid" },
      { id: 2, name: "Drone Chaud" },
    ];

    // simulate db.all → callback sans erreur
    db.all.mockImplementation((sql, params, cb) => {
      cb(null, fakeRows);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });

      droneCtrl.getDrones(req, res);
    });

    expect(db.all).toHaveBeenCalledWith(
      "SELECT * FROM drone",
      [],
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeRows);
  });

  test("retourne 500 en cas d'erreur BDD", async () => {
    const req = {};
    const res = createMockRes();

    const fakeError = new Error("DB error");

    db.all.mockImplementation((sql, params, cb) => {
      cb(fakeError, null);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });

      droneCtrl.getDrones(req, res);
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: fakeError.message });
  });
});

describe("droneCtrl.getDroneById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("retourne le drone correspondant avec status 200", async () => {
    const req = { params: { id: "3" } };
    const res = createMockRes();

    const fakeRow = {
      id: 3,
      name: "Drone Test",
      price: 15000,
    };

    db.get.mockImplementation((sql, params, cb) => {
      cb(null, fakeRow);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });

      droneCtrl.getDroneById(req, res);
    });

    expect(db.get).toHaveBeenCalledWith(
      "SELECT * FROM drone WHERE ID=" + req.params.id,
      [],
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeRow);
  });

  test("retourne 500 en cas d'erreur BDD dans getDroneById", async () => {
    const req = { params: { id: "3" } };
    const res = createMockRes();

    const fakeError = new Error("DB error on get");

    db.get.mockImplementation((sql, params, cb) => {
      cb(fakeError, null);
    });

    await new Promise((resolve) => {
      res.json.mockImplementation((data) => {
        resolve(data);
      });

      droneCtrl.getDroneById(req, res);
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: fakeError.message });
  });
});
