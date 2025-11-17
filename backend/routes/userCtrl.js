// routes/authCtrl.js
import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-moi';

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

async function register(req, res) {
  try {
    const { name, firstname, username, email, password } = req.body || {};

    if (!name || !firstname || !username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l’utilisateur existe déjà
    const existing = await dbGet(
      'SELECT id FROM user WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existing) {
      return res.status(409).json({ error: 'Email ou username déjà utilisé' });
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Insertion en base
    const userId = await dbRun(
      `INSERT INTO user (name, firstname, username, email, password)
       VALUES (?, ?, ?, ?, ?)`,
      [name, firstname, username, email, hashed]
    );

    // Génération du token JWT (stateless)
    const token = jwt.sign(
      { id: userId, username, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: {
        id: userId,
        name,
        firstname,
        username,
        email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function login(req, res) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "username et password requis" });
    }

    // Vérifier si l’utilisateur existe
    const user = await dbGet(
      "SELECT * FROM user WHERE username = ? OR email = ?",
      [username, username]
    );

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Vérification mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        firstname: user.firstname,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

const userCtrl = { register , login};
export default userCtrl;
