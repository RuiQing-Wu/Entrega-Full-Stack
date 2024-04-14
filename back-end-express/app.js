var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var estadisticaRouter = require("./routes/estadistica");
var informeRouter = require("./routes/informe");

var estadisticasController = require("./controllers/estadisticasController");

var nats = require("nats");
const { SERVICE } = require("./utils/constantes");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// Configuración de NATS
async function main() {
  const nc = await nats.connect({ servers:  "nats://localhost:4222" });
  // Suscripción a todos los temas
  const sub = nc.subscribe("*");
  console.log("Conexión a NATS establecida");
  // Procesamiento de los mensajes
  for await (const msg of sub) {
    const data = JSON.parse(msg.data);
    console.log(`Mensaje recibido con tema de evento: ${msg.subject}`);
    console.log(`Mensaje recibido: ${msg.data}`);

    await estadisticasController.saveEstadistica(msg.subject, data.data);
  }
}

main().catch((err) => {
  console.error("Error:", err);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/estadisticas", estadisticaRouter);
app.use("/informes", informeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
