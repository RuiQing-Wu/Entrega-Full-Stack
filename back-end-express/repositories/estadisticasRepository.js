const estadistica = require("../models/estadistica");
const mongoClient = require("../config/mongoClient");
const { SERVICE } = require("../utils/constantes");
let db = mongoClient.connectMongo();

class EstadisticasRepository {
  static async saveEstadistica(tipo_evento, mensaje) {
    try {
      const newEstadistica = new estadistica({
        tipo_evento: tipo_evento,
        fecha_evento: new Date(),
        mensaje: JSON.stringify(mensaje),
      });

      await newEstadistica.save();
      return newEstadistica;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  static async getEstadisticaUsuario() {
    try {
      const estadisticaUsuario = await estadistica.find({ tipo_evento: SERVICE.USER_MODULE });
      return estadisticaUsuario;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEstadisticaComunidad() {
    try {
      const estadisticaComunidad = await estadistica.find({ tipo_evento: SERVICE.COMUNIDAD_MODULE });
      return estadisticaComunidad;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEstadisticaCausas() {
    try {
      const estadisticaCausas = await estadistica.find({ tipo_evento: SERVICE.CAUSAS_MODULE });
      return estadisticaCausas;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEstadisticaAcciones() {
    try {
      const estadisticaAcciones = await estadistica.find({ tipo_evento: SERVICE.ACCION_MODULE });
      return estadisticaAcciones;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEstadisticaContribucion() {
    try {
      const estadisticaContribucion = await estadistica.find({ tipo_evento: SERVICE.CONTRIBUCION_MODULE });
      return estadisticaContribucion;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = EstadisticasRepository;
