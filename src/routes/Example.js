/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Example = require("../controllers/Example");

module.exports = (app, router) => {
  // ejemplo de ruta
  router.get("/api/example/example", Example.example());

  app.use(router);
};
