var express = require("express");
var router = express.Router();
var estadisticasController = require("../controllers/estadisticasController");

/* GET estadisticas listing. */
router.get("/", async (req, res) => {
  res.render("estadisticas/estadistica");
});

module.exports = router;
