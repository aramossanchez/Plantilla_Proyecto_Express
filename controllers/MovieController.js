const movies = require("../models/MovieModel.js");

const MovieController = {};

MovieController.getAll =  (req, res) =>{
    res.json(movies.findAll());
};

MovieController.getById = (req,res) =>{
    res.json(movies.findById(req.params.id));
};

MovieController.postMovie = (req, res) =>{
    const id = req.body.id;
    const title = req.body.title;
    res.json(movies.post({id, title}));
};

MovieController.updateMovie = (req,res) => {
    const id = req.params.id;
    const body = req.body;
    res.json(movies.update({id, ...body})); //SE ASIGNA DESDE EL PRIMER ELEMENTO DEL OBJETO (id) Y LUEGO SE PASA TODO LOS PARAMETROS QUE ENTRARAN POR EL BODY. SE HACE CON LOS ... (...body)
};

MovieController.deleteMovie = (req,res) =>{
    res.send(movies.delete(req.params.id));
}

module.exports = MovieController;