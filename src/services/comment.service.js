const BaseService = require('./base.service');
let _commentRepository = null,
    _ideaRepository = null;

class CommentService extends BaseService {
    constructor({CommentRepository, IdeaRepository}){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId must be send";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId); //Garantizarnos que la idea existe

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "ideaId does not exists";
            throw error;
        }

        //Si existe la idea sacamos los comments
        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId, userId) {
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
            error.message = "Idea does not exists"
        }

        const createdComment = await _commentRepository.create({...comment, author: userId});
        idea.comments.push(createdComment);


        return await _ideaRepository.update(ideaId, {comments: idea.comments});
    }
}

module.exports = CommentService;