const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();
const modelPublicaciones = require("../models/publicaciones");

class publicacionesRepository {
  static async getPublicaciones(req) {
    try {
      //Recoger publicaciones que esten asociadas a las comunidades a las que pertenece el usuario
      const publicaciones = await modelPublicaciones.find({
        comunidad: req,
      });
      return publicaciones;
    } catch (error) {
      throw error;
    }
  }

  static async getPublicacionesConComentarios(publicacionId) {
    try {
      const publicaciones = await modelPublicaciones
        .findById(publicacionId)
        .populate("comentarios")
        .exec();
      return publicaciones;
    } catch (error) {
      throw error;
    }
  }

  static async savePublicacion(req, res, publi, comunidad, usuario) {
    try {
      //Quitar <p> y </p> de la publicacion
      //const regex = /<p>|<\/p>/g;
      //req.body.publicacion = req.body.publicacion.replace(regex, "");

      const publicacion = new modelPublicaciones({
        descripcion: publi,
        comunidad: comunidad,
        usuario: "juan",
        fecha_publicacion: new Date(),
      });

      await publicacion.save();

      return publicacion;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = publicacionesRepository;
