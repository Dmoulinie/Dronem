// utils/ajoutDonnes.js
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createTables(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let pending = 3;

      const done = (err) => {
        if (err) return reject(err);
        pending -= 1;
        if (pending === 0) {
          console.log('tables créées');
          resolve();
        }
      };

      db.run(`
        CREATE TABLE IF NOT EXISTS drone (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          price INTEGER,
          image_path TEXT,
          model TEXT,
          category TEXT,
          speed INT,
          battery INTEGER
        )
      `, done);

      db.run(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          firstname TEXT,
          username TEXT,
          email TEXT,
          password TEXT
        )
      `, done);

      db.run(`
        CREATE TABLE IF NOT EXISTS cart (
          id_user INTEGER,
          id_drone INTEGER,
          quantity TEXT,
          PRIMARY KEY (id_user, id_drone),
          FOREIGN KEY (id_user) REFERENCES user(id),
          FOREIGN KEY (id_drone) REFERENCES drone(id)
        )
      `, done);
    });
  });
}

export async function insererDrones(db) {
  const raw = await fs.readFile(
    path.join(__dirname, '../public/drone.json'),
    'utf-8'
  );
  const items = JSON.parse(raw);

  await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION', (err) => {
        if (err) return reject(err);
      });

      const stmt = db.prepare(`
        INSERT OR REPLACE INTO drone
          (id, name, description, price, image_path, model, category, speed, battery)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const drone of items) {
        stmt.run(
          drone.id,
          drone.name,
          drone.description,
          drone.price,
          drone.image_path,
          drone.model,
          drone.category,
          drone.speed,
          drone.battery,
          (err) => {
            if (err) return reject(err);
          }
        );
      }

      stmt.finalize((err) => {
        if (err) return reject(err);

        db.run('COMMIT', (err2) => {
          if (err2) return reject(err2);
          console.log('données insérées');
          resolve();
        });
      });
    });
  });
}
