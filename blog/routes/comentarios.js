var express = require("express");
var router = express.Router();
var comentariosController = require("../controllers/comentariosController");

router.get("/:id", async function (req, res) {
  try {
    const comentarios = await comentariosController.getComentarios(req);
    res.send(comentarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async function (req, res) {
  try {
    const saveComentario = await comentariosController.saveComentario(req, res);
    if (!saveComentario) {
      throw new Error("Error al guardar el comentario");
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
