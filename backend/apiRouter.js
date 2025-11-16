// imports
import express from 'express';
import droneCtrl from './routes/droneCtrl.js';
import cartCtrl from './routes/cartCtrl.js';


const apiRouter = express.Router();


// route de récupération des drones
apiRouter.get('/drones/getDrones', droneCtrl.getDrones);
apiRouter.get('/drones/getDroneById/:id', droneCtrl.getDroneById);

apiRouter.get('/carts/getCartById/:id', cartCtrl.getCartById);
apiRouter.post('/carts/addToCart', cartCtrl.addToCart);

export { apiRouter as router };