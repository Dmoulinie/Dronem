// Routes

import db from '../db.js';

function getDrones(req, res) {
     db.all('SELECT * FROM drone', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(rows);
  });
}

function getDroneById(req,res){
    const id = req.params.id;
    db.get("SELECT * FROM drone WHERE ID="+id, [], (err,rows) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(rows);
    })
}


const droneCtrl = {getDrones, getDroneById}

export default droneCtrl