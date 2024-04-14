var express = require("express");
var router = express.Router();

const informeController = require("../controllers/informesController");
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const comunidades = await informeController.getAllComunidades();

    if (!comunidades) {
      return res.render("index", { comunidades: [] });
    }

    res.render("index", { comunidades: comunidades });
  } catch (error) {
    res.render("error", { mensajeError: "Internal Server Error Check Nest Back-End Status" });
  }
});

module.exports = router;
