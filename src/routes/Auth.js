/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const path = require('path');
const Auth = require(path.resolve(__dirname, '../controllers/Auth'));
const Token = require(path.resolve(__dirname, '../helpers/Token'));

module.exports = (app, router, firebaseAdmin, firebaseClient) => {
	// ejemplo de ruta
	router.post('/api/auth/login', Auth.Login(firebaseClient));
	router.use(Token.auth());
	router.post('/api/auth/getUser', Auth.GetUser(firebaseAdmin));
	router.post('/api/auth/user', Auth.CreateUser(firebaseAdmin));
	router.post('/api/auth/validateUser', Auth.ValidateUser(firebaseAdmin));
	router.get('/api/auth/getUsers', Auth.GetAllUsers(firebaseAdmin));
	router.post('/api/auth/deleteUser', Auth.DeleteUSer(firebaseAdmin));

	app.use(router);
};
