const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  idPublicacion: { type: mongoose.Schema.Types.ObjectId, ref: "publicacions" },
  idUsuario: String,
  comentario: String,
  fecha_comentario: Date,
});

module.exports = mongoose.model("comentarios", comentarioSchema);
