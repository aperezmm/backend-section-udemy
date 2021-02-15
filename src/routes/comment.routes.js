const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ CommentController}){
    const router = Router();

    router.get("/:commentId/unique", CommentController.get);
    router.get("/:commentId", CommentController.getIdeaComments);
    router.post("/:commentId", AuthMiddleware, CommentController.createComment);
    router.patch("/:commentId", AuthMiddleware, CommentController.update);
    router.delete("/:commentId", AuthMiddleware,  CommentController.delete);

    
    return router;
};