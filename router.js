const MovieRouter = require("./views/MovieRouter.js");
const router = require("express").Router();

//RUTAS
router.use("/movies", MovieRouter);

module.exports = router;