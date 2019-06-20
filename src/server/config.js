const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const routes = require(path.resolve(__dirname, "routes"));
const swagger = require(path.resolve(__dirname, "swagger/swagger"));
const monitor = require("express-status-monitor");
const envs = require(path.resolve(__dirname, "./envs"));
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
var monitorConfig = require(path.resolve(__dirname, "monitorConfig"));
FirebaseAdmin = require(path.resolve(__dirname, "FirebaseAdmin"));
FirebaseClient = require(path.resolve(__dirname, "FirebaseClient"));
/* Helpers para los Controllers */
var { Validator } = require("express-json-validator-middleware");
const Token = require(path.resolve(__dirname, "../helpers/Token"));
const newError = require(path.resolve(__dirname, "../helpers/newError"));

// Imports de llave pública, privada y método para la autentificación de JWT.
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../../keys/private.key"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../../keys/public.key"),
  "utf8"
);

// este módulo sirve para separar la configuración del servidor
// del archivo que instancia el servidor.
module.exports = app => {
  let vars = {};
  let firebaseConfig = {};
  /* SETTINGS */
  //establece las configuraciones de host y port
  if (envs.env.NODE_ENV) {
    switch (envs.env.NODE_ENV) {
      case "local":
        vars = envs.env.local;
        firebaseConfig = envs.firebase.dev;
        break;
      case "development":
        vars = envs.env.dev;
        firebaseConfig = envs.firebase.dev;

        break;
      case "production":
        vars = envs.env.prod;
        firebaseConfig = envs.firebase.prod;
        break;
      default:
        vars = envs.env.local;
        firebaseConfig = envs.firebase.dev;
        break;
    }
    // Guarda en express variables de uso global
    app.set("port", vars.port);
    app.set("host", vars.host);
    app.set("debug_routemap", envs.env.DEBUG_ROUTEMAP);

    Log.Success(
      "\nVariables de entorno cargadas. Entorno: " + envs.env.NODE_ENV
    );
  } else {
    Log.ErrorLog(
      "No se ha podido instanciar las variables de entorno. El servidor ha fallado."
    );
    return null;
  }

  /* MIDDLEWARES */
  // Solo instancia morgan en entorno dev y local
  if ((envs.env.NODE_ENV = "dev" || "development" || "local"))
    app.use(morgan("dev"));
  // dependencias para json y http(s)
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  // instancia de firebase
  const firebaseAdmin = FirebaseAdmin(firebaseConfig);
  const firebaseClient = FirebaseClient(firebaseConfig);
  // crea el objeto de routing
  const router = express.Router();
  // instancia de swagger
  // swagger(app, router);
  // inicia el servicio de monitoreo
  app.use(monitor(monitorConfig));

  // crea el middleware para validación de endpoints
  var validator = new Validator({ allErrors: true });
  var validate = validator.validate;

  if (
    firebaseAdmin != null &&
    firebaseClient != null &&
    Token.keys(privateKey, publicKey)
  ) {
    /* ROUTES */
    routes(
      app,
      router,
      newError,
      validate,
      firebaseAdmin,
      firebaseClient,
      Token
    );
    Log.Success("Configuración del servidor establecida.");
    return app;
  } else {
    Log.ErrorLog("Algo ha fallado con las configuraciones de la API.");
    return null;
  }
};
