// imports
import express from 'express';
import droneCtrl from './routes/droneCtrl.js';


const apiRouter = express.Router();


// route de récupération des drones
apiRouter.get('/drones/getDrones', droneCtrl.getDrones);
apiRouter.get('/drones/getDroneById/:id', droneCtrl.getDroneById);

export { apiRouter as router };