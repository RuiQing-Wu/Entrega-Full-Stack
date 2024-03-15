const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();
const modelComentarios = require("../models/comentarios");
const publicaciones = require("../models/publicaciones");

class comentariosRepository {
  static async getComentariosByPublicacionId(req) {
    try {
      const comentarios = await modelComentarios.find({
        idPublicacion: req,
      });
      return comentarios;
    } catch (error) {
      throw error;
    }
  }

  static async getComentarioById(req) {
    try {
      const comentario = await modelComentarios.findById(req);
      return comentario;
    } catch (error) {
      throw error;
    }
  }

  static async saveComentario(req) {
    try {
      const comentario = new modelComentarios({
        idPublicacion: req.body.id_publicacion,
        idUsuario: req.session.user.id,
        comentario: req.body.comentario,
        fecha_comentario: new Date(),
      });

      await comentario.save();

      const publicacion = await publicaciones.findById(req.body.id_publicacion);

      if (!publicacion) {
        throw new Error("Publicacion no encontrada");
      }

      publicacion.comentarios.push(comentario._id);
      await publicacion.save();

      return comentario;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = comentariosRepository;
