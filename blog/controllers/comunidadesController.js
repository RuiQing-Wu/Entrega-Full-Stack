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

  static async getComunidadesByAdminId(adminId) {
    const comunidades = await comunidadRepository.getComunidadesByAdminId(
      adminId
    );
    return comunidades;
  }

  static async getComunidadesByUserId(userId) {
    const comunidades = await comunidadRepository.getComunidadesByUserId(
      userId
    );
    return comunidades;
  }
}

module.exports = ComunidadesController;
