// app.js
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const apiRouter = require('./apiRouter');

const app = express();
const PORT = 3000;

// Connexion à la base
const db = new sqlite3.Database(path.join(__dirname, 'dronem_database.db'));

// Création de la table si elle n’existe pas
db.run(`
  CREATE TABLE IF NOT EXISTS drone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price INTEGER,
    image_path TEXT,
    modele TEXT,
    category TEXT,
    speed TEXT,
    battery INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    firstname TEXT,
    username TEXT,
    email TEXT,
    password TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id_user INTEGER ,
    id_drone INTEGER,
    name TEXT,
    quantity TEXT,
    PRIMARY KEY (id_user,id_drone),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_drone) REFERENCES drone(id)
  )
`);

// affiche le schéma (toutes les tables + structure)
db.all("SELECT sql FROM sqlite_master WHERE type='table';", [], (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("=== Schéma de la base ===");
    rows.forEach((row) => console.log(row.sql));
  }
});


// Middleware
app.use(express.json());
//app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use('/api', apiRouter);

// Lancement du serveur
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));