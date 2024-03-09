var express = require("express");
var router = express.Router();
var publicacionesController = require("../controllers/publicacionesController");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const publicaciones = await publicacionesController.getPublicaciones();
  res.render("index", { publicaciones: publicaciones });
  // res.send('Hello World');
});

module.exports = router;
