// imports
import express from 'express';
import droneCtrl from './routes/droneCtrl.js';
import cartCtrl from './routes/cartCtrl.js';
import userCtrl from './routes/userCtrl.js';


const apiRouter = express.Router();


// route de récupération des drones
apiRouter.get('/drones/getDrones', droneCtrl.getDrones);
apiRouter.get('/drones/getDroneById/:id', droneCtrl.getDroneById);

apiRouter.get('/carts/getCartById/:id', cartCtrl.getCartById);
apiRouter.post('/carts/addToCart', cartCtrl.addToCart);

apiRouter.post('/users/register', userCtrl.register)
apiRouter.post('/users/login', userCtrl.login)

export { apiRouter as router };