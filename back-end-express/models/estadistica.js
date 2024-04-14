const mongoose = require("mongoose");

const estadisticaSchema = new mongoose.Schema({
  tipo_evento: String,
  fecha_evento: Date,
  mensaje: String,
});

module.exports = mongoose.model("Estadistica", estadisticaSchema);

