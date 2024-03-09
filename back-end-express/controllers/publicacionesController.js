const publicacionesRepository = require("../repositories/publicacionesRepository");

const publicacionesController = {
  async getPublicaciones(req, res) {
    try {
      const publicaciones = await publicacionesRepository.getPublicaciones();
      return publicaciones;
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async savePublicacion(req, res) {
    try {
      const savePublicacion = await publicacionesRepository.savePublicacion(
        req
      );
      return savePublicacion;
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = publicacionesController;
