const mongoose = require("mongoose");

const publicacionSchema = new mongoose.Schema({
  descripcion: String,
  comunidad: String,
  idAdministrador: String,
  fecha_publicacion: Date,
});

module.exports = mongoose.model("publicacions", publicacionSchema);
