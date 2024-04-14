var express = require("express");
var router = express.Router();

const informeController = require("../controllers/informesController");
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Peticion Informe Comunidad "+ id);

  try {
    const data = await informeController.getInfoComunidad(id);
    if (!data) {
      res.render("error", { mensajeError: "No se ha encontrado la comunidad" });
    }

    // Convierte el objeto comunidades en un string JSON
    res.render("informes/informe", { informe: JSON.stringify(data), comunidad: data});
  } catch (error) {
    res.render("error", { mensajeError: "Internal Server Error" });
  }
});

module.exports = router;
