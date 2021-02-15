const { Router } = require("express");
const {ParseIntMiddleware, AuthMiddleware} = require("../middlewares")

module.exports = function({ IdeaController}){
    const router = Router();

    router.get("", ParseIntMiddleware ,IdeaController.getAll);
    router.get(":userId/all", IdeaController.getUserIdeas);
    router.get("/:ideaId", IdeaController.get);
    router.post("", AuthMiddleware, IdeaController.create);
    router.patch("/:ideaId", AuthMiddleware, IdeaController.update);
    router.delete("/:ideaId", AuthMiddleware, IdeaController.delete);

    router.post("/:ideaId/upvote", IdeaController.upvoteIdea);
    router.post("/:ideaId/downvote", IdeaController.downvoteIdea);

    
    return router;
};