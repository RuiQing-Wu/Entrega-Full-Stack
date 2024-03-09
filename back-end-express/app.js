var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var estadisticaRouter = require("./routes/estadistica");
var informeRouter = require("./routes/informe");
var publicacionRouter = require("./routes/publicacion");
var comunidadesRouter = require("./routes/comunidades");

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce", "skins"))
);
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce", "themes"))
);
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce", "plugins"))
);
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce", "langs"))
);

app.use("/", indexRouter);
app.use("/estadisticas", estadisticaRouter);
app.use("/informe", informeRouter);
app.use("/publicaciones", publicacionRouter);
app.use("/comunidades", comunidadesRouter);

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
