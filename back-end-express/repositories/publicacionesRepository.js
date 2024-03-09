const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();
const modelPublicaciones = require("../models/publicaciones");

const publicacionesRepository = {
  async getPublicaciones() {
    try {
      const publicaciones = await (await db).db
        .collection("publicacions")
        .find({})
        .toArray();

      return publicaciones;
    } catch (error) {
      throw error;
    }
  },
  async savePublicacion(req) {
    try {
      const publicacion = new modelPublicaciones({
        descripcion: req.body.publicacion,
        comunidad: 1,
        idAdministrador: 1,
        fecha_publicacion: new Date(),
      });

      await publicacion.save();

      return publicacion;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = publicacionesRepository;
