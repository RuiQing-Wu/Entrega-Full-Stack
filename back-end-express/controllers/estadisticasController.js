const EstadisticasRepository = require("../repositories/estadisticasRepository");

class EstadisticasController {
  static async saveEstadistica(tipo_evento, mensaje) {
    console.log(tipo_evento);
 
    const estadisticaGuardada =
      await EstadisticasRepository.saveEstadistica(tipo_evento, mensaje);
    return estadisticaGuardada;
  }
  
  static async getEstadisticaUsuario() {
    const estadisticaUsuario =
      await EstadisticasRepository.getEstadisticaUsuario();
    return estadisticaUsuario;
  }

  static async getEstadisticaComunidad() {
    const estadisticaComunidad =
      await EstadisticasRepository.getEstadisticaComunidad();
    return estadisticaComunidad;
  }

  static async getEstadisticaCausas() {
    const estadisticaCausas =
      await EstadisticasRepository.getEstadisticaCausas();
    return estadisticaCausas;
  }

  static async getEstadisticaAcciones() {
    const estadisticaAcciones =
      await EstadisticasRepository.getEstadisticaAcciones();
    return estadisticaAcciones;
  }

  static async getEstadisticaContribucion() {
    const estadisticaContribucion =
      await EstadisticasRepository.getEstadisticaContribucion();
    return estadisticaContribucion;
  }
}

module.exports = EstadisticasController;
