import { describe, test, expect, vi, beforeEach } from "vitest";

// --- Mocks partagés --- //
const appMock = {
  use: vi.fn(),
  listen: vi.fn((port, cb) => cb && cb()),
};

// on va stocker les middlewares json / urlencoded pour les vérifier
const jsonMiddleware = () => {};
const urlencodedMiddleware = () => {};
const staticMock = vi.fn(() => "static-mw");

// Mock d'express
vi.mock("express", () => {
  const expressFn = () => appMock;

  // express.json() -> renvoie une fonction middleware
  expressFn.json = vi.fn(() => jsonMiddleware);

  // express.urlencoded(...) -> renvoie une fonction middleware
  expressFn.urlencoded = vi.fn(() => urlencodedMiddleware);

  // express.static(...)
  expressFn.static = staticMock;

  return {
    __esModule: true,
    default: expressFn,
  };
});

// Mock de cors
const corsMock = vi.fn(() => "cors-mw");
vi.mock("cors", () => ({
  __esModule: true,
  default: corsMock,
}));

// Mock de db.js
const dbAllMock = vi.fn((sql, params, cb) => cb && cb(null, []));
const dbMock = { all: dbAllMock };
vi.mock("../db.js", () => ({
  __esModule: true,
  default: dbMock,
}));

// Mock utils/ajoutDonnes.js
const createTablesMock = vi.fn(() => Promise.resolve());
const insererDronesMock = vi.fn(() => Promise.resolve());
vi.mock("../utils/ajoutDonnes.js", () => ({
  __esModule: true,
  createTables: createTablesMock,
  insererDrones: insererDronesMock,
}));

// Mock apiRouter.js
const apiRouterMock = { isRouter: true };
vi.mock("../apiRouter.js", () => ({
  __esModule: true,
  router: apiRouterMock,
}));

describe("app.js (start)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("configure express et démarre le serveur correctement", async () => {
    // 💥 On importe app.js : ça exécute start()
    await import("../app.js");

    // 1) Vérifier l'ordre des app.use

    // 1er appel -> cors()
    expect(appMock.use).toHaveBeenNthCalledWith(1, "cors-mw");

    // 2e appel -> express.json()
    expect(appMock.use).toHaveBeenNthCalledWith(2, jsonMiddleware);

    // 3e appel -> express.urlencoded({ extended: true })
    expect(appMock.use).toHaveBeenNthCalledWith(3, urlencodedMiddleware);

    // 4e appel -> /public + static
    expect(staticMock).toHaveBeenCalledTimes(1);
    const staticArg = staticMock.mock.calls[0][0];
    expect(typeof staticArg).toBe("string"); // chemin vers /public
    expect(appMock.use).toHaveBeenNthCalledWith(4, "/public", "static-mw");

    // 5e appel -> /api + router
    expect(appMock.use).toHaveBeenNthCalledWith(5, "/api", apiRouterMock);

    // 2) createTables et insererDrones appelés avec db
    expect(createTablesMock).toHaveBeenCalledTimes(1);
    expect(createTablesMock).toHaveBeenCalledWith(dbMock);

    expect(insererDronesMock).toHaveBeenCalledTimes(1);
    expect(insererDronesMock).toHaveBeenCalledWith(dbMock);

    // 3) db.all appelé pour afficher le schéma
    expect(dbAllMock).toHaveBeenCalledTimes(1);
    expect(dbAllMock.mock.calls[0][0]).toMatch(/sqlite_master/);

    // 4) Serveur écoute sur port 8080
    expect(appMock.listen).toHaveBeenCalledTimes(1);
    expect(appMock.listen.mock.calls[0][0]).toBe(8080);
  });
});
