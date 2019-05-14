// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const path = require('path');
const Auth = require(path.resolve(__dirname, '../routes/Auth'));
const Log = require(path.resolve(__dirname, '../helpers/Logs'));

module.exports = (app, router, firebaseAdmin, firebaseClient) => {
	/* Rutas de login */
	Auth(app, router, firebaseAdmin, firebaseClient);

	Log.Success('Rutas de la API cargadas.');
};
