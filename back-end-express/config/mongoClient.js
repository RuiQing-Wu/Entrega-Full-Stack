require("dotenv").config();
const mongoose = require("mongoose");

// Configura las credenciales
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const dbName = process.env.MONGO_DB_NAME;

// Configura la URL de conexión a MongoDB
// mongoose.connect('mongodb://username:password@host:port/database?options...');
const mongoURL = process.env.MONGO_URL;

async function connectMongo() {
  // Conecta a MongoDB
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
    user: username,
    pass: password,
  });

  // Manejador de eventos de conexión
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
  db.once("open", () => {
    console.log("Conexión a MongoDB establecida: " + db.db.databaseName);
  });

  /* // Gracefully close the connection when the application exits
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected" +
          " due to application termination"
      );
      process.exit(0);
    });
  }); */

  return db;
}

module.exports = {
  connectMongo,
  mongoose,
};
