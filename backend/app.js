// app.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const apiRouter = require('./apiRouter').router;
const ajoutDonnees = require('./utils/ajoutDonnes');

const app = express();
const PORT = 8080;

// Connexion à la base
const db = new sqlite3.Database(path.join(__dirname, 'dronem_database.db'));

// instantiation de la base au départ

// création des tables
 ajoutDonnees.createTables(db)

// affiche le schéma (toutes les tables + structure)
db.all("SELECT sql FROM sqlite_master WHERE type='table';", [], (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("=== Schéma de la base ===");
    rows.forEach((row) => console.log(row.sql));
  }
});

db.close();
console.log('Connexion SQLite fermée ✅');


// Middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// Lancement du serveur
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));