import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import sqlite3 from "sqlite3";

// Mock de fs/promises AVANT l'import du module à tester
vi.mock("fs/promises", () => {
  return {
    default: {
      readFile: vi.fn(),   // utilisé comme fs.readFile(...)
    },
  };
});

import fs from "fs/promises";
import { createTables, insererDrones } from "../utils/ajoutDonnes.js";

describe("utils/ajoutDonnes", () => {
  let db;

  beforeEach(() => {
    // BDD en mémoire pour les tests
    db = new sqlite3.Database(":memory:");
  });

  afterEach(() => {
    db.close();
    vi.clearAllMocks();
  });

  test("createTables crée les tables drone, user et cart", async () => {
    await createTables(db);

    const tables = await new Promise((resolve, reject) => {
      db.all(
        "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('drone','user','cart')",
        [],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

    expect(tables.map((t) => t.name).sort()).toEqual(["cart", "drone", "user"]);
  });

  test("insererDrones insère les données lues depuis le JSON", async () => {
    await createTables(db);

    const fakeDrones = [
      {
        id: 1,
        name: "Drone A",
        description: "Desc A",
        price: 1000,
        image_path: "a.png",
        model: "M1",
        category: "Froid",
        speed: 10,
        battery: 100,
      },
      {
        id: 2,
        name: "Drone B",
        description: "Desc B",
        price: 2000,
        image_path: "b.png",
        model: "M2",
        category: "Chaud",
        speed: 20,
        battery: 200,
      },
    ];

    // Simule le contenu du fichier JSON
    fs.readFile.mockResolvedValue(JSON.stringify(fakeDrones));

    await insererDrones(db);

    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM drone ORDER BY id", [], (err, rows) =>
        err ? reject(err) : resolve(rows)
      );
    });

    expect(rows).toHaveLength(2);
    expect(rows[0].name).toBe("Drone A");
    expect(rows[1].price).toBe(2000);
  });
});
