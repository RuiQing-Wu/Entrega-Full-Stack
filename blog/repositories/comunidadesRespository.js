const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();
const comunidadSchema = require("../models/comunidad");

class ComunidadesRepository {
  static async getAllComunidades() {
    try {
      const comunidades = await comunidadSchema.find({}).lean();
      return comunidades;
    } catch (error) {
      console.error("Error al obtener todas las comunidades:", error);
      throw error;
    }
  }

  static async getComunidadById(id) {
    try {
      const comunidad = await comunidadSchema.findById(id).lean();
      return comunidad;
    } catch (error) {
      console.error("Error al obtener la comunidad por ID:", error);
      throw error;
    }
  }

  static async getComunidadesByUserId(userId) {
    try {
      const comunidades = await comunidadSchema
        .find({ usuarios: userId })
        .lean();
      return comunidades;
    } catch (error) {
      console.error(
        "Error al obtener las comunidades por ID de usuario:",
        error
      );
      throw error;
    }
  }

  static async getComunidadesByAdminId(adminId) {
    try {
      const comunidades = await comunidadSchema
        .find({ idAdministrador: adminId })
        .lean();
      return comunidades;
    } catch (error) {
      console.error("Error al obtener las comunidades por ID de admin:", error);
      throw error;
    }
  }
}

module.exports = ComunidadesRepository;
