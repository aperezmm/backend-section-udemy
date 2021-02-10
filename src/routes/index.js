//Encargado de hacer la configuracion de todas las rutas

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors'); //Ayuda a capturar en un middleware las excepciones

//requeruimos los middleware
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');

module.exports = function({HomeRoutes}){
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    apiRoutes.use("/home", HomeRoutes);

    router.use("/v1/api", apiRoutes);

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;    
};