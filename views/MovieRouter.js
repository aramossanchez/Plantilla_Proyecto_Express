const expresss = require ("express");
const router = expresss.Router();

//IMPORTO MODELO DE DATOS
const MovieController = require ("../controllers/MovieController.js");

//CRUD
router.get("/", MovieController.getAll);

router.get("/:id", MovieController.getById);

router.post("/", MovieController.postMovie);

router.put("/:id", MovieController.updateMovie);

router.delete("/:id", MovieController.deleteMovie);

module.exports = router;