var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World from informe");
});

module.exports = router;
