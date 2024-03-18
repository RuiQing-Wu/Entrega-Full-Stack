var express = require("express");
var router = express.Router();
var publicacionesController = require("../controllers/publicacionesController");

// Recibo una peticion POST a publicaciones y la envio al controlador
router.post("/", async function (req, res) {
  try {
    const publicacion = req.body.data.publicaciones; // Acceder al dato publicaciones en el cuerpo de la solicitud
    const comunidad = req.body.data.comunidad;
    const usuario = req.body.data.usuario;
    const savePublicacion = await publicacionesController.savePublicacion(
      req,
      res,
      publicacion,
      comunidad,
      usuario
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
