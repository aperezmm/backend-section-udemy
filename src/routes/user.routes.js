const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");

module.exports = function({ UserController}){
    const router = Router();

    //Podemos usar varios middlewares
    router.get("/:userId", UserController.get);
    router.get("", [AuthMiddleware, ParseIntMiddleware], UserController.getAll);
    router.patch("/:userId", UserController.update);
    router.delete("/:userId", UserController.delete);

    
    return router;
};