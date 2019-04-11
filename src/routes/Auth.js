/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Auth = require("../controllers/Auth");

module.exports = (app, router) => {
  // ejemplo de ruta
  router.post("/api/auth/user", Auth.CreateUser());

  app.use(router);
};
