var express = require("express");
var router = express.Router();
var publicacionesController = require("../controllers/publicacionesController");

// Recibo una peticion POST a publicaciones y la envio al controlador
router.post("/", async function (req, res) {
  try {
    const publicacion = req.body.publicacion;
    const comunidad = req.body.comunidad;

    const savePublicacion = await publicacionesController.savePublicacion(
      req,
      res
    );
    if (!savePublicacion) {
      throw new Error("Error al guardar la publicacion");
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
