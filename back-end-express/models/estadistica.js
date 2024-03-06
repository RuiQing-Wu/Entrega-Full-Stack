const mongoose = require("mongoose");

const estadisticaSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});

module.exports = mongoose.model("Estadistica", estadisticaSchema);

