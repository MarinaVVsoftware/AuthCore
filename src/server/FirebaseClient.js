var firebase = require('firebase');

var keys = require('./keys');

// inicialización de firebase separada
module.exports = () => {
	var config = {
		apiKey: keys.client_credentials.apiKey,
		authDomain: keys.client_credentials.authDomain,
		databaseURL: keys.client_credentials.databaseURL,
		projectId: keys.client_credentials.projectId,
		storageBucket: keys.client_credentials.storageBucket,
		messagingSenderId: keys.client_credentials.messagingSenderId
	};
	firebase.initializeApp(config);
	console.log('\x1b[32m', 'Inicialización de Firebase Client exitosa.');
	return firebase;
};
