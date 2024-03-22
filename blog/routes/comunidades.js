var express = require("express");
var router = express.Router();
var comunidadesController = require("../controllers/comunidadesController");

/* GET estadisticas listing. */
router.get("/", async (req, res) => {
  const comunidades = await comunidadesController.getAllComunidades();

  res.render("comunidades", { comunidades: comunidades });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comunidad = await comunidadesController.getComunidadById(id);
  res.render("comunidad", { comunidad: comunidad });
});

router.get("/notificacion/:id", async (req, res) => {
  const { id } = req.params;
  const comunidad = await comunidadesController.getComunidadById(id);
  res.status(200).json(comunidad);
});

module.exports = router;
