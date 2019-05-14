var admin = require('firebase-admin');
const path = require('path');
const Log = require(path.resolve(__dirname, '../helpers/Logs'));
const keys = require(path.resolve(__dirname, 'keys'));

// inicialización de firebase separada
module.exports = () => {
	try {
		const firebase = admin.initializeApp(
			{
				credential: admin.credential.cert(keys.server_credentials),
				databaseURL: keys.config.database_url
			},
			'server'
		);

		Log.Success('Inicialización de Firebase Admin exitosa.');
		return firebase;
	} catch (error) {
		Log.ErrorLog('Algo ha fallado con Firebase: ' + error);
		return null;
	}
};
