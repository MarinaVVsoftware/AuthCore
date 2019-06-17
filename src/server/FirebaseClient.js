var firebase = require("firebase");
const path = require("path");

// inicialización de firebase separada
module.exports = config => {
  if (!config) return null;
  try {
    firebase.initializeApp(config);
    console.log("\x1b[32m", "Inicialización de Firebase Client exitosa.");
    return firebase;
  } catch (error) {
    Log.ErrorLog("Algo ha fallado con Firebase: " + error);
    return null;
  }
};
