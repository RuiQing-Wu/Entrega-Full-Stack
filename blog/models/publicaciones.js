const mongoose = require("mongoose");

const publicacionSchema = new mongoose.Schema({
  descripcion: String,
  comunidad: String,
  usuario: String,
  fecha_publicacion: Date,
  comentarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comentarios",
    },
  ],
});

module.exports = mongoose.model("publicacions", publicacionSchema);
