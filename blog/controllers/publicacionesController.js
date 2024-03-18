const publicacionesRepository = require("../repositories/publicacionesRepository");

class publicacionesController {
  static async getPublicaciones(req, res) {
    const publicaciones = await publicacionesRepository.getPublicaciones(req);
    return publicaciones;
  }

  static async getPublicacionesConComentarios(publicacionId) {
    const publicaciones =
      await publicacionesRepository.getPublicacionesConComentarios(
        publicacionId
      );
    return publicaciones;
  }

  static async savePublicacion(res, req, publicacion, comunidad, usuario) {
    console.log("llega");
    const savePublicacion = await publicacionesRepository.savePublicacion(
      res,
      req,
      publicacion,
      comunidad,
      usuario
    );
    return savePublicacion;
  }
}

module.exports = publicacionesController;
