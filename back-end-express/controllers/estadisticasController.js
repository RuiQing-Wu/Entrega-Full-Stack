const EstadisticasRepository = require("../repositories/estadisticasRepository");

class EstadisticasController {
  static async getEstadisticasAllComunidades() {
    // ...
    const estadisticas =
      await EstadisticasRepository.getEstadisticasAllComunidades();
    return estadisticas;
  }

  async getComunidadById(req, res) {
    const comunidad = await EstadisticasRepository.getComunidadById(
      req.params.id
    );
    return comunidad;
  }

  async getEstadisticasComunidad(req, res) {
    const { id } = req.params;
    const estadisticas = await EstadisticasRepository.getEstadisticas(id);
    res.json(estadisticas);
  }
}

module.exports = EstadisticasController;
