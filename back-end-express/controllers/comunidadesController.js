const comunidadRepository = require("../repositories/comunidadesRespository");

class ComunidadesController {
  static async getAllComunidades() {
    const comunidades = await comunidadRepository.getAllComunidades();
    return comunidades;
  }

  static async getComunidadById(id) {
    const comunidad = await comunidadRepository.getComunidadById(id);
    return comunidad;
  }
}

module.exports = ComunidadesController;
