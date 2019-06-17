// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
const ErrorHandler = require(path.resolve(
  __dirname,
  "../middlewares/ErrorHandler"
));
/* Imports de Rutas */
const Auth = require(path.resolve(__dirname, "../routes/Auth"));

module.exports = (
  app,
  router,
  newError,
  validate,
  firebaseAdmin,
  firebaseClient,
  Token
) => {
  /* Rutas de login */
  Auth(app, router, newError, validate, firebaseAdmin, firebaseClient, Token);

  ErrorHandler(app);

  Log.Success("Rutas de la API cargadas.");
};
