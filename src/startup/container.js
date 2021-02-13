//Inyección de dependencias
const {createContainer, asClass, asValue, asFunction} = require('awilix');

//config
const config = require('../config');
const app = require('.');

//Service
const {HomeService, UserService, IdeaService, CommentService} = require("../services");

//Controllers
const {HomeController, UserController, IdeaController, CommentController} = require("../controllers");

//Routes
const {HomeRoutes} = require("../routes/index.routes");
const Routes = require('../routes');


//models 9 de feb
const {User, Idea, Comment} = require("../models");

//repositories 11 de feb   
const {UserRepository, IdeaRepository, CommentRepository} = require("../repositories");

const container = createContainer();

//Metodo para crear una nueva clase de inyección
container
    .register({
        //Configuracion principal de la app
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        CommentService: asClass(CommentService).singleton(),
        IdeaService: asClass(IdeaService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        CommentController: asClass(CommentController.bind(CommentController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })
    .register({
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton()
    });

module.exports = container;