const { Router } = require("express");

module.exports = function({ CommentController}){
    const router = Router();

    router.get("/:commentId/unique", CommentController.get);
    router.get("/:commentId", CommentController.getIdeaComments);
    router.post("/:commentId", CommentController.createComment);
    router.patch("/:commentId", CommentController.update);
    router.delete("/:commentId", CommentController.delete);

    
    return router;
};