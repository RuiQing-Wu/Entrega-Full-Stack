const estadistica = require("../models/estadistica");
const mongoClient = require("../config/mongoClient");
let db = mongoClient.connectMongo();

class EstadisticasRepository {
  static async getEstadisticasAllComunidades() {
    var result = await (await db).db.collection("comunidads").find().toArray();

    // console.log(result);
    return result;
  }

  static async getEstadisticas(id) {
    // ...
    db.collection("comunidads")
      .find({ comunidad: id })
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
      });
  }

  static async getComunidadById(id) {
    db.collection("comunidads")
      .find({ comunidad: id })
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
      });
  }
}

module.exports = EstadisticasRepository;
