const Log = require("../helpers/Logs");

// Controller - Auth
const Auth = {};

// Ejemplo de controller
Auth.CreateUser = function() {
  return function(req, res) {
    // validaciones del objeto res previo a su manipulación
    // if (!req.body.email)
    //   return res.status(400).send("No se ha especificado un email.");
    // if (!req.body.password)
    //   return res.status(400).send("No se ha especificado una contraseña.");

    // snippets para manejar los datos
    const user = req.body.email;
    const password = req.body.password;

    try {
      // código del controller

      // respuesta código 200 OK
      res.status(200).send(JSON.stringify("message"));
    } catch (error) {
      Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
      res.status(500).send("Algo ha fallado en el servidor! Error: " + error);
    }
  };
};

// POST: entrega información sobre si existe o no un usuario registrado.
Auth.ValidateUser = function(firebaseAdmin) {
  return function(req, res) {
    // valida si se está enviando en el body el mail
    if (!req.body.email)
      return res
        .status(400)
        .send("No se ha especificado un email para validar.");

    try {
      firebaseAdmin
        .auth()
        .getUserByEmail(req.body.email)
        .then(user => {
          //si el usuario existe, arroja code:200 y un boolean true
          res.status(200).send(JSON.stringify({ user: true }));
        })
        .catch(error => {
          if (error.code === "auth/user-not-found") {
            //si el usuario no existe, arroja code:200 y un boolean false
            res.status(200).send(JSON.stringify({ user: false }));
          } else {
            Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
            res.status(500).send(
              JSON.stringify({
                error: "Algo ha fallado en el servidor! Error: " + error
              })
            );
          }
        });
    } catch (error) {
      Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
      res.status(500).send(
        JSON.stringify({
          error: "Algo ha fallado en el servidor! Error: " + error
        })
      );
    }
  };
};

// GET: lista de usuarios existentes en la DB de firebase.
Auth.GetAllUsers = function(firebaseAdmin) {
  var list = [];

  return function(req, res) {
    try {
      // trae una lista de 1000 usuarios. Este método de firebase se encuentra en la documentación
      // como una función recursiva, no se logró implementar así y desafortunadamente trae un número
      // fijo de usuarios.
      firebaseAdmin
        .auth()
        .listUsers(1000)
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            // deconstruye la información de firebase en un nuevo objeto reducido
            list.push({
              uid: userRecord.uid,
              email: userRecord.email,
              displayName: userRecord.displayName
            });
          });
          // devuelve la lista de usuarios
          res.status(200).send(JSON.stringify({ users: list }));
        })
        .catch(function(error) {
          Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
          res.status(500).send(
            JSON.stringify({
              error: "Algo ha fallado en el servidor! Error: " + error
            })
          );
        });
    } catch (error) {
      Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
      res.status(500).send(
        JSON.stringify({
          error: "Algo ha fallado en el servidor! Error: " + error
        })
      );
    }
  };
};

module.exports = Auth;
