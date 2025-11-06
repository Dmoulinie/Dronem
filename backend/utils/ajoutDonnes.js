
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// c'est ici qu'on va mettre le script pour ajouter les drones à la base

// Exported functions
module.exports = {
    createTables : function(){
        
        const db = new sqlite3.Database('../dronem_database.db');

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
    },

    insererDrones : function(){
        // script pour ajouter les drones dans la base en fonction du json de jomi
        // TODO
    } }