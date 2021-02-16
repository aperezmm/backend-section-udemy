const BaseService = require('./base.service');
let _ideaService = null;

class IdeaService extends BaseService {
    constructor({IdeaRepository}){
        super(IdeaRepository);
        _ideaService = IdeaRepository;
    }

    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message = "userId must be send";
            throw error;
        }

        return await _ideaService.getUserIdeas(author);
    }

    //Las ideas tienen votos positivos y negativos
    async upvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be send";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "ideaId does not exists";
            throw error;
        }

        idea.upvotes.push(true);

        return await _ideaRepository.update(ideaId, {upvotes: idea.upvotes}); //Le actualizamos los upvotes
    }

    async downvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be send";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);
        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "ideaId does not exists";
            throw error;
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, {downvotes: idea.downvotes}); //Le actualizamos los upvotes
    }
}

module.exports = IdeaService;