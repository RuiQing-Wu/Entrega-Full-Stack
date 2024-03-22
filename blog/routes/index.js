const express = require("express");
const router = express.Router();
const publicacionesController = require("../controllers/publicacionesController");
const comentariosController = require("../controllers/comentariosController");
const comunidadesController = require("../controllers/comunidadesController");
const usersController = require("../controllers/usersController");

router.get("/", async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.redirect("/login");
    }

    // Obtener datos comunidades, publicaciones y comentarios
    const miembroComunidades =
      await comunidadesController.getComunidadesByUserId(user.id);
    const comunidadesUser = await comunidadesController.getComunidadesByAdminId(
      user.id
    );

    const publicacionesPromises = [];

    for (const comunidad of miembroComunidades) {
      const publicaciones = await publicacionesController.getPublicaciones(
        comunidad.nombre
      );

      for (const publicacion of publicaciones) {
        const comentarios =
          await comentariosController.getComentariosByPublicacionId(
            publicacion._id
          );
        for (const comentario of comentarios) {
          const usuario = await usersController.getUserById(
            comentario.idUsuario
          );
          comentario.idUsuario = usuario.username;
        }
        publicacion.comentarios = comentarios;
      }

      publicacionesPromises.push(...publicaciones);
    }

    publicacionesPromises.forEach((publicacion) => {
      miembroComunidades.forEach((comunidad) => {
        if (publicacion.comunidad == comunidad._id) {
          publicacion.comunidad = comunidad.nombre;
        }
      });
    });

    res.render("index", {
      publicaciones: publicacionesPromises,
      comunidades: comunidadesUser,
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
