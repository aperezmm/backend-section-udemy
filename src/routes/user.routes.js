const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require("../middlewares");
const { CACHE_TIME } = require("../helpers");
module.exports = function({ UserController}){
    const router = Router();

    //Podemos usar varios middlewares
    router.get("/:userId", UserController.get);
    //Se va a cachear por una hora.
    router.get("", [AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], UserController.getAll);
    router.patch("/:userId", UserController.update);
    router.delete("/:userId", UserController.delete);

    
    return router;
};