var admin = require("firebase-admin");
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));

// inicialización de firebase separada
module.exports = config => {
  if (!config) return null;
  try {
    const firebase = admin.initializeApp(
      {
        credential: admin.credential.cert(config.admin),
        databaseURL: config.database.database_url
      },
      "server"
    );

    Log.Success("Inicialización de Firebase Admin exitosa.");
    return firebase;
  } catch (error) {
    Log.ErrorLog("Algo ha fallado con Firebase: " + error);
    return null;
  }
};
