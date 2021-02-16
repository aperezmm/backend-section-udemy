const BaseRepository = require('./base.repository');
let _idea = null;


class IdeaRepository extends BaseRepository {
    constructor({ Idea }){
        super(Idea);
        _idea = Idea;
    }

    async getUserIdeas(author){
        return await _idea.find({author}); //Busca todas las ideas donde el autor sea el que hemos enviado
    }

}

module.exports = IdeaRepository;