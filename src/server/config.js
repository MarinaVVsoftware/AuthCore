const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const swagger = require(path.resolve(__dirname, 'swagger/swagger'));
const routes = require(path.resolve(__dirname, 'routes'));
const monitor = require('express-status-monitor');
const Log = require(path.resolve(__dirname, '../helpers/Logs'));
FirebaseAdmin = require(path.resolve(__dirname, 'FirebaseAdmin'));
FirebaseClient = require(path.resolve(__dirname, 'FirebaseClient'));
var monitorConfig = require(path.resolve(__dirname, 'monitorConfig'));

// este módulo sirve para separar la configuración del servidor
// del archivo que instancia el servidor.
module.exports = (app) => {
	/* SETTINGS */
	//establece el puerto, ya sea por variable de entorno o predeterminado.
	app.set('port', process.env.PORT || 8080);

	/* MIDDLEWARES */
	app.use(morgan('dev'));
	app.use(express.json());
	app.use(bodyParser.json());
	app.use(cors);
	// instancia de firebase
	const firebaseAdmin = FirebaseAdmin();
	const firebaseClient = FirebaseClient();
	// crea el objeto de routing
	const router = express.Router();
	// instancia de swagger
	swagger(app, router);
	// inicia el servicio de monitoreo
	app.use(monitor(monitorConfig));

	if (firebaseAdmin != null && firebaseClient != null) {
		/* ROUTES */
		routes(app, router, firebaseAdmin, firebaseClient);

		Log.Success('Configuración del servidor establecida.');
		return app;
	} else {
		Log.ErrorLog('Algo ha fallado con Firebase');
		return null;
	}
};
