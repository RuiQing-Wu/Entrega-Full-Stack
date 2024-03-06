var express = require("express");
var router = express.Router();
var estadisticasController = require("../controllers/estadisticasController");

var comunidad = class Comunidad {
  constructor(
    id,
    nombre,
    descripcion,
    fechaInicio,
    idAdministrador,
    usuarios,
    categorias
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.descripcion = descripcion;
    this.idAdministrador = idAdministrador;
    this.usuarios = usuarios;
    this.categorias = categorias;
  }
};

/* GET estadisticas listing. */
router.get("/", async (req, res) => {
  const estadisticas =
    await estadisticasController.getEstadisticasAllComunidades();

  let comunidades = [];
  estadisticas.forEach((element) => {
    comunidades.push(
      new comunidad(
        element.id,
        element.nombre,
        element.descripcion,
        element.fechaInicio,
        element.idAdministrador,
        element.usuarios,
        element.categorias
      )
    );
  });

  console.log(comunidades);
  res.render("estadisticas/comunidad", { comunidades: comunidades });
});

router.get("/:id/", async (req, res) => {
  /* const { id } = req.params;
  const estadisticas = await estadisticasController.getEstadisticasComunidad(
    id
  );
  res.json(estadisticas); */
});

module.exports = router;
