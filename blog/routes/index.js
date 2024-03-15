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
        comunidad._id
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

    for (const comunidad of comunidadesUser) {
      const publicaciones = await publicacionesController.getPublicaciones(
        comunidad._id
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

    //Cambiar el formato de las fechas
    publicacionesPromises.forEach((publicacion) => {
      publicacion.fecha_publicacion = formatDate(publicacion.fecha_publicacion);
      publicacion.comentarios.forEach((comentario) => {
        comentario.fecha_comentario = formatDate(comentario.fecha_comentario);
      });
    });

    // Función para formatear la fecha
    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      return dateObj.toLocaleDateString(undefined, options);
    }

    publicacionesPromises.forEach((publicacion) => {
      miembroComunidades.forEach((comunidad) => {
        if (publicacion.comunidad == comunidad._id) {
          publicacion.comunidad = comunidad.nombre;
        }
      });
    });

    publicacionesPromises.forEach((publicacion) => {
      comunidadesUser.forEach((comunidad) => {
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
