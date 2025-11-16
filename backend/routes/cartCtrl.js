// Routes

import db from '../db.js';

function addToCart(req, res) {
  const { id_user, id_drone, delta } = req.body;

  // Validation basique
  const userId = Number(id_user);
  const droneId = Number(id_drone);
  const qDelta = Number(delta);

  if (!Number.isInteger(userId) || !Number.isInteger(droneId) || !Number.isFinite(qDelta)) {
    return res.status(400).json({ error: 'id_user, id_drone et delta doivent être des nombres' });
  }

  // On récupère la quantité actuelle (ou 0 si pas encore dans le panier)
  db.get(
    'SELECT quantity FROM cart WHERE id_user = ? AND id_drone = ?',
    [userId, droneId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      const currentQty = row ? Number(row.quantity) || 0 : 0;
      let newQty = currentQty + qDelta;

      // On ne descend jamais sous 0
      if (newQty < 0) newQty = 0;

      // Si pas de ligne existante et quantité finale = 0 → rien à faire
      if (!row && newQty === 0) {
        return res.status(200).json({
          id_user: userId,
          id_drone: droneId,
          quantity: 0,
        });
      }

      if (row) {
        // UPDATE si la ligne existe déjà
        db.run(
          'UPDATE cart SET quantity = ? WHERE id_user = ? AND id_drone = ?',
          [newQty, userId, droneId],
          function (updateErr) {
            if (updateErr) return res.status(500).json({ error: updateErr.message });
            return res.status(200).json({
              id_user: userId,
              id_drone: droneId,
              quantity: newQty,
            });
          }
        );
      } else {
        // INSERT si nouvelle entrée
        db.run(
          'INSERT INTO cart (id_user, id_drone, quantity) VALUES (?, ?, ?)',
          [userId, droneId, newQty], // name à adapter si besoin
          function (insertErr) {
            if (insertErr) return res.status(500).json({ error: insertErr.message });
            return res.status(201).json({
              id_user: userId,
              id_drone: droneId,
              quantity: newQty,
            });
          }
        );
      }
    }
  );
}

function getCartById(req, res) {
  const id_user = Number(req.params.id);

  if (!Number.isFinite(id_user)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  db.all(
    "SELECT * FROM cart WHERE id_user = ?",
    [id_user],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json(rows);
    }
  );
}


const cartCtrl = { addToCart, getCartById };

export default cartCtrl;
