/** //- PROCESO DE INSTANCIA DE LA API
 *  1. Crea la configuración del servidor en src/server/config.js
 *  2. Carga las "keys" desde el archivo .env, es importante que este documento exista.
 *     debe contener datos sensibles para instanciar firebase.
 *  3. Carga morgan, json, cors y firebaseApp (requiere credenciales).
 *  4. Carga los Routes y Controllers.
 *        - Routes: Mapa de rutas de la API.
 *        - Controllers: Código de cada ruta de la API, estructurado.
 *  5. Carga la storage-session que mantendrá con la sesión del usuario.
 *  6. Inicia la aplicación.
 */
const path = require('path');
const express = require('express'); //import express
const Log = require(path.resolve(__dirname, 'src/helpers/Logs'));
const config = require(path.resolve(__dirname, 'src/server/config')); //importa la configuración

// se pasa como parámetro la instancia de express al módulo de config
const app = config(express());

if (app) {
	//start server on port: 8080
	const server = app.listen(app.get('port'), function() {
		Log.Success('API inicializó exitosamente.');
		Log.Success('Server escuchando en: ' + process.env.HOST);
	});
}
