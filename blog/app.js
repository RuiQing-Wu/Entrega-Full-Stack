var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");


var indexRouter = require("./routes/index");
var publicacionRouter = require("./routes/publicacion");
var comunidadesRouter = require("./routes/comunidades");
var loginRouter = require("./routes/login");
var comentariosRouter = require("./routes/comentarios");
var subscriptionRouter = require("./routes/subscription");

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
    handlebars: require("handlebars"),
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    helpers: {
      striptags: function (text) {
        return text.toString().replace(/<[^>]*>/g, "");
      },
    },
  })
);
app.set("view engine", "hbs");


app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
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
app.use("/publicaciones", publicacionRouter);
app.use("/comunidades", comunidadesRouter);
app.use("/login", loginRouter);
app.use("/comentarios", comentariosRouter);
app.use("/subscription", subscriptionRouter);

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
