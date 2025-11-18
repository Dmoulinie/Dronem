// tests/userCtrl.test.js
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

// 🧪 On mock la DB, bcrypt et jwt AVANT d'importer le contrôleur
vi.mock("../db.js", () => {
  // on simule seulement ce dont on a besoin : db.get et db.run
  return {
    default: {
      get: vi.fn(),
      run: vi.fn()
    }
  };
});

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn()
  }
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn()
  }
}));

import userCtrl from "../routes/userCtrl.js";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

describe("userCtrl (register & login)", () => {

  // Réinitialiser tous les mocks avant chaque test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("register retourne 400 si champ manquant", async () => {
    const req = {
      body: {
        name: "Doe",
        firstname: "John",
        username: "jdoe",
        email: "" // manquant
        // pas de password
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await userCtrl.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });

  test("register crée un utilisateur si données valides", async () => {
    // db.get renvoie null => pas encore d'utilisateur
    db.get.mockImplementation((sql, params, cb) => cb(null, null));

    // bcrypt.hash renvoie un mot de passe hashé
    bcrypt.hash.mockResolvedValue("hashed-password");

    // db.run insère un user et renvoie un lastID
    db.run.mockImplementation((sql, params, cb) => cb.call({ lastID: 42 }, null));

    // jwt.sign renvoie un faux token
    jwt.sign.mockReturnValue("fake-jwt-token");

    const req = {
      body: {
        name: "Doe",
        firstname: "John",
        username: "jdoe",
        email: "jdoe@example.com",
        password: "secret"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await userCtrl.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "fake-jwt-token",
        user: expect.objectContaining({
          id: 42,
          username: "jdoe",
          email: "jdoe@example.com"
        })
      })
    );
  });

  test("login retourne 404 si utilisateur introuvable", async () => {
    db.get.mockImplementation((sql, params, cb) => cb(null, null));

    const req = {
      body: {
        username: "unknown",
        password: "whatever"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await userCtrl.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Utilisateur introuvable" })
    );
  });

  test("login retourne 401 si mot de passe incorrect", async () => {
    db.get.mockImplementation((sql, params, cb) =>
      cb(null, {
        id: 1,
        name: "Doe",
        firstname: "John",
        username: "jdoe",
        email: "jdoe@example.com",
        password: "hashed-password"
      })
    );

    bcrypt.compare.mockResolvedValue(false); // mauvais mdp

    const req = {
      body: {
        username: "jdoe",
        password: "wrong-password"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await userCtrl.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Mot de passe incorrect" })
    );
  });

  test("login retourne 200 avec token si login ok", async () => {
    db.get.mockImplementation((sql, params, cb) =>
      cb(null, {
        id: 1,
        name: "Doe",
        firstname: "John",
        username: "jdoe",
        email: "jdoe@example.com",
        password: "hashed-password"
      })
    );

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    const req = {
      body: {
        username: "jdoe",
        password: "secret"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await userCtrl.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "fake-jwt-token",
        user: expect.objectContaining({
          id: 1,
          username: "jdoe",
          email: "jdoe@example.com"
        })
      })
    );
  });
});
