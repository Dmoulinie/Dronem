import { describe, expect, test, vi } from "vitest";
import path from "path";
import { fileURLToPath } from "url";

// On prépare notre faux constructeur sqlite
const mockDatabase = vi.fn();

// Mock dynamique, compatible Vitest
vi.mock("sqlite3", async () => {
  const actual = await vi.importActual("sqlite3"); // on récupère le module réel

  return {
    __esModule: true,
    default: {
      ...actual.default,        // on garde les propriétés réelles
      verbose: vi.fn(() => actual.default), // mock propre
      Database: mockDatabase,   // 🔥 on remplace juste le constructeur
    },
  };
});

test("db.js initialise sqlite3.Database avec le bon chemin", async () => {
  // On importe db.js APRES le mock, très important
  const db = (await import("../db.js")).default;

  // On reconstruit le chemin attendu
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const expectedPath = path.join(
    path.join(__dirname, ".."),
    "dronem_database.db"
  );

  expect(mockDatabase).toHaveBeenCalledTimes(1);
  expect(mockDatabase).toHaveBeenCalledWith(expectedPath);

  expect(db).toBeDefined();
});
