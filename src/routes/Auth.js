/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const Auth = require("../controllers/Auth");

module.exports = (app, router, firebaseAdmin) => {
  // ejemplo de ruta
  router.post("/api/auth/getUser", Auth.GetUser(firebaseAdmin));
  router.post("/api/auth/user", Auth.CreateUser(firebaseAdmin));
  router.post("/api/auth/validateUser", Auth.ValidateUser(firebaseAdmin));
  router.get("/api/auth/users", Auth.GetAllUsers(firebaseAdmin));
  router.post("/api/auth/deleteUser", Auth.DeleteUSer(firebaseAdmin));

  app.use(router);
};
