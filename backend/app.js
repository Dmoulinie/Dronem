import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import db from './db.js';
import { router as apiRouter } from './apiRouter.js';
import { createTables, insererDrones } from './utils/ajoutDonnes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

async function start() {
  // création des tables + insertion
  await createTables(db);
  await insererDrones(db);

  // affiche le schéma (toutes les tables + structure)
  db.all("SELECT sql FROM sqlite_master WHERE type='table';", [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("=== Schéma de la base ===");
      rows.forEach((row) => console.log(row.sql));
    }
  });

  // Lancement du serveur
  app.listen(PORT, () =>
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
  );
}

start().catch((err) => {
  console.error('Erreur au démarrage :', err);
  process.exit(1);
});
