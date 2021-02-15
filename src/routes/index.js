//Encargado de hacer la configuracion de todas las rutas

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors'); //Ayuda a capturar en un middleware las excepciones

//requeruimos los middleware
const { NotFoundMiddleware, ErrorMiddleware, AuthMiddleware } = require('../middlewares');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDocument = require('SWAGGER_PATH');

module.exports = function({HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes}){
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/comment", CommentRoutes);
    apiRoutes.use("/auth", AuthRoutes);

    router.use("/v1/api", apiRoutes);
    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);
    router.use(AuthMiddleware);

    return router;    
};