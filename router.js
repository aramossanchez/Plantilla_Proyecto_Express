const router = require('express').Router();

//Importamos Routes definidas en views
const IngredientRouter = require('./views/IngredientRouter');
const RecipeRouter = require('./views/RecipeRouter');
const ContainRouter = require('./views/ContainRouter');

//Rutas
router.use('/ingredients', IngredientRouter);
router.use('/recipes', RecipeRouter);
router.use('/contains', ContainRouter);

module.exports = router;