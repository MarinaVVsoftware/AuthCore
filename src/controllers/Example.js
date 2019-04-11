const Log = require("../helpers/Logs");

// Controller - Login
const Login = {};

// Ejemplo de controller
Login.example = function() {
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

module.exports = Login;
