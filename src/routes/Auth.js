/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const path = require("path");
const Auth = require(path.resolve(__dirname, "../controllers/Auth"));
const Schema = require(path.resolve(__dirname, "../schemas/Auth"));

module.exports = (
  app,
  router,
  newError,
  validate,
  firebaseAdmin,
  firebaseClient,
  Token
) => {
  // ejemplo de ruta
  router.post(
    "/api/auth/",
    validate({ body: Schema.BodyAuth }),
    Auth.Auth(newError, firebaseClient, Token.generateToken)
  );
  Token.auth();
  router.post(
    "/api/auth/login/",
    validate({ body: Schema.BodyLogin }),
    Auth.Login(newError, firebaseClient, Token.generateToken)
  );
  router.get("/api/auth/users/", Auth.GetAllUsers(newError, firebaseAdmin));
  router.get(
    "/api/auth/users/:email/",
    validate({ params: Schema.ParamsGetUser }),
    Auth.GetUser(newError, firebaseAdmin)
  );
  router.put(
    "/api/auth/users/:email/",
    validate({ params: Schema.ParamsPutUser, body: Schema.BodyPutUser }),
    Auth.PutUser(newError, firebaseAdmin, app.get("host"))
  );
  router.get(
    "/api/auth/users/:email/validate/",
    validate({ params: Schema.ParamsValidateUser }),
    Auth.ValidateUser(newError, firebaseAdmin)
  );
  router.delete(
    "/api/auth/users/:email/",
    validate({ params: Schema.ParamsDeleteUser }),
    Auth.DeleteUSer(newError, firebaseAdmin, app.get("host"))
  );

  app.use(router);
};
