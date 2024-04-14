var express = require("express");
var router = express.Router();
var estadisticasController = require("../controllers/estadisticasController");

/* GET estadisticas listing. */
router.get("/", async (req, res) => {
  res.render("estadisticas/estadistica");
});

router.get("/getEstadisticaUser", async (req, res) => {
  try {
    const data = await estadisticasController.getEstadisticaUsuario();
    res.json(data);
  } catch (error) {
    res.render("error", { mensajeError: "Error al obtener datos Usuarios" });
  }
});

router.get("/getEstadisticaComunidad", async (req, res) => {
  try {
    const data = await estadisticasController.getEstadisticaComunidad();
    res.json(data);
  } catch (error) {
    res.render("error", { mensajeError: "Error al obtener datos Comunidad" });
  }
});

router.get("/getEstadisticaCausas", async (req, res) => {
  try {
    const data = await estadisticasController.getEstadisticaCausas();
    res.json(data);
  } catch (error) {
    res.render("error", { mensajeError: "Error al obtener datos Causas" });
  }
});

router.get("/getEstadisticaAcciones", async (req, res) => {
  try {
    const data = await estadisticasController.getEstadisticaAcciones();
    res.json(data);
  } catch (error) {
    res.render("error", { mensajeError: "Error al obtener datos Acciones" });
  }
});

router.get("/getEstadisticaContribucion", async (req, res) => {
  try {
    const data = await estadisticasController.getEstadisticaContribucion();
    res.json(data);
  } catch (error) {
    res.render("error", { mensajeError: "Error al obtener datos Contribucion" });
  }
});

module.exports = router;
