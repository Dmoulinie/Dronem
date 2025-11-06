// imports
const express = require('express');
const droneCtrl = require('./routes/droneCtrl');

// Router
exports.router = (function() {
    const apiRouter = express.Router();

    //  route de récupération des drones
    apiRouter.route('/drones/getDrones/').get(droneCtrl.getDrones);


    return apiRouter;
})();