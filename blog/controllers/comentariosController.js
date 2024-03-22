const comentariosRepository = require("../repositories/comentariosRepository");

class comentariosController {
  static async getComentarios(req, res) {
    const comentarios = await comentariosRepository.getComentarios(req);
    return comentarios;
  }

  static async getComentarioById(req, res) {
    const comentario = await comentariosRepository.getComentarioById(req);
    return comentario;
  }

  static async getComentariosByPublicacionId(req, res) {
    const comentarios =
      await comentariosRepository.getComentariosByPublicacionId(req);
    return comentarios;
  }

  static async saveComentario(req, res) {
    const saveComentario = await comentariosRepository.saveComentario(req, res);
    return saveComentario;
  }
}

module.exports = comentariosController;
