/** Routes de todas las rutas para el sistema de login. */

/* CONTROLLERS */
// ejemplo de instancia de controlador
const path = require("path");
const Auth = require(path.resolve(__dirname, "../controllers/Auth"));

module.exports = (app, router, firebaseAdmin, firebaseClient, Token) => {
	// ejemplo de ruta
	router.post("/api/auth/login", Auth.Login(firebaseClient, Token.generateToken));
	router.use(Token.auth());
	router.post("/api/auth/getUser", Auth.GetUser(firebaseAdmin));
	router.post("/api/auth/user", Auth.CreateUser(firebaseAdmin));
	router.post("/api/auth/validateUser", Auth.ValidateUser(firebaseAdmin));
	router.get("/api/auth/getUsers", Auth.GetAllUsers(firebaseAdmin));
	router.post("/api/auth/deleteUser", Auth.DeleteUSer(firebaseAdmin));

	app.use(router);
};
