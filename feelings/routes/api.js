var express = require('express');
var router = express.Router();
var apiController = require("../Controllers/apiController");
var posteosController = require("../Controllers/posteosController");
var usersController = require("../Controllers/usersController");
var mensajesController = require("../Controllers/mensajesController");
var uploadAvatar = require("../middlewares/multerAvatar");
var uploadImagenes = require("../middlewares/multerImagenes");
var verifyToken = require("../middlewares/verifyToken");
/* GET home page. */
router.get("/",apiController.documentacion);
router.get("/users",usersController.allUsers);
router.post("/users/register",usersController.register);
router.post("/users/login",usersController.login);
router.put("/users/editar/:id",uploadAvatar.any(),usersController.editar);
router.delete("/users/eliminar/:id",usersController.eliminar);
router.get("/users/profile/:id",usersController.profile);
router.post("/users/seguir/:idSeguidor/:idSeguido",usersController.seguir);
router.delete("/users/dejar-de-seguir/:idSeguidor/:idSeguido",usersController.noSeguir);
router.get("/posteos",posteosController.allPosteos);
router.post("/posteos/crear",uploadImagenes.any(),posteosController.crear);
router.put("/posteos/editar/:id",posteosController.editar);
router.delete("/posteos/eliminar/:id",posteosController.eliminar);
router.get("/mensajes/:idUser",mensajesController.mensajes);
router.post("/mensajes/crear",mensajesController.crear);
router.delete("/mensajes/eliminar/:id",mensajesController.eliminar);

module.exports = router;
