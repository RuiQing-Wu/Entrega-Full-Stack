const mongoose = require("mongoose");

const comunidadSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fechaInicio: Date,
  idAdministrador: String,
  usuarios: [String],
  categorias: [String],
});

module.exports = mongoose.model("Comunidad", comunidadSchema);
