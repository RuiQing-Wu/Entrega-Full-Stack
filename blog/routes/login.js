var express = require("express");
var session = require("express-session");
var router = express.Router();
var usersController = require("../controllers/usersController");

router.get("/", function (req, res, next) {
  res.render("login", { display: "none" });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID de usuario no proporcionado" });
  }

  const user = await usersController.getUserById(res, req, id);
  return res.status(200).json(user);
});

router.post("/user-login", async function (req, res, next) {
  const user = await usersController.userLogin(req, res);
  if (!user) {
    mensajeError = "Usuario o contraseña incorrectos";
    return res.render("login", {
      mensajeError: mensajeError,
      display: "block",
    });
  }

  req.session.user = { username: user.username, id: user._id };
  res.redirect("/");
});

router.get("/user/cerrar-sesion", function (req, res, next) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
