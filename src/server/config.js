const express = require("express");
// si no está el archivo .env el programa tronará.
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const swagger = require("./swagger/swagger");
const routes = require("./routes");
const monitor = require("express-status-monitor");
const Log = require("../helpers/Logs");
var keys = require("./Keys");
var monitorConfig = require("./monitorConfig");

// este módulo sirve para separar la configuración del servidor
// del archivo que instancia el servidor.
module.exports = app => {
  /* SETTINGS */
  //establece el puerto, ya sea por variable de entorno o predeterminado.
  app.set("port", process.env.PORT || 8080);

  /* MIDDLEWARES */
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  /* ROUTES */
  routes(app, router);

  Log.Success("Configuración del servidor establecida.");
  return app;
};
