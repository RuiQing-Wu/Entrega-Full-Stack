const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  nombre: String,
  telefono: String,
  ciudad: String,
  pais: String,
  role: String,
});

module.exports = mongoose.model("users", UsersSchema);
