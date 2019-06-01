const fetch = require("node-fetch");
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
require("firebase/auth");

// Controller - Auth
const Auth = {};

// POST: recibe los datos para el login con firebase y devuelve el resultado de login.
Auth.Login = function (firebaseClient, generateToken) {
	return function (req, res) {
		if (!req.body.email) return res.status(400).send("No se ha especificado un email.");
		if (!req.body.password) return res.status(400).send("No se ha especificado una contraseña.");

		const user = req.body.email;
		const password = req.body.password;
		const { emails } = JSON.parse(process.env.DEV_EMAILS);
		if (!emails.includes(user)) return res.status(400).send({ error: "Email inválido" });
		try {
			firebaseClient
				.auth()
				.signInWithEmailAndPassword(user, password)
				.then((result) => {
					// Genera un token y regresa un objeto encriptado.
					const token = generateToken({ uid: result.user.uid });
					res.status(200);
					res.json({ token });
				})
				.catch(function (error) {
					let message = "";

					// genera un mensaje de error basado en el código de error de firebase auth.
					// https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=es-419#signInWithEmailAndPassword
					switch (error.code) {
						case "auth/account-exists-with-different-credential":
							message =
								"Error no manejado: account-exists-with-different-credential. Contacte a soporte.";
							break;
						case "auth/invalid-credential":
							message = "La credencial está mal formateada, o ha expirado.";
							break;
						case "operation-not-allowed":
							message = "El servidor no admite el tipo de sesión. Contacte a soporte.";
							break;
						case "auth/user-disabled":
							message = "El usuario ha sido deshabilitado.";
							break;
						case "auth/user-not-found":
							message = "El usuario no existe.";
							break;
						case "auth/wrong-password":
							message = "Contraseña incorrecta.";
							break;
						case "auth/invalid-verification-code":
							message = "Error no manejado: invalid-verification-code. Contacte a soporte.";
							break;
						case "auth/invalid-verification-id":
							message = "Error no manejado: invalid-verification-id. Contacte a soporte.";
							break;

						default:
							message =
								"Error no manejado: " +
								error.code +
								". Contacte a soporte. Error Message: " +
								error.message;
							break;
					}

					res.status(200).send(JSON.stringify({ auth: false, error: message }));
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send("Algo ha fallado en el servidor! Error: " + error);
		}
	};
};

// POST: crea un usuario en firebase.
Auth.CreateUser = function (firebaseAdmin) {
	return function (req, res) {
		// validaciones del request
		if (!req.body.email) return res.status(400).send("No se ha especificado un email en el body.");
		if (!req.body.password) return res.status(400).send("No se ha especificado un password en el body.");
		if (!req.body.displayName) return res.status(400).send("No se ha especificado un displayName en el body.");
		if (!req.body.username) return res.status(400).send("No se ha especificado un username en el body.");

		// creación de la cuenta en firebase/auth, luego guarda una referencia al usuario en
		// la firebase/database.
		try {
			// hace un fetch a validateUser para saber si existe el usuario
			fetch(process.env.HOST + "api/auth/validateUser", {
				method: "POST",
				body: JSON.stringify({ email: req.body.email }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			})
				.then((res) => res.json())
				.then(function (response) {
					// si la respuesta se devolvió correctamente, != null
					if (response) {
						//si response.state = false que significa que no existe el usuario
						// en caso que exista, devuelve un error
						if (!response.state) {
							firebaseAdmin
								.auth()
								.createUser({
									email: req.body.email,
									emailVerified: false,
									password: req.body.password,
									displayName: req.body.displayName,
									disabled: false
								})
								.then((userRecord) => {
									// aqui se guarda en la database el usuario para permitir login por usuario
									var ref = firebaseAdmin.database().ref("/Users");
									ref.child(userRecord.uid).set({
										displayName: req.body.displayName,
										email: req.body.email
									});

									// envía un code:200 con un mensaje del estado del proceso
									res.status(200).send(
										JSON.stringify({
											state: "Usuario Creado: " + req.body.username
										})
									);
								})
								.catch(function (error) {
									let message = "";
									// genera un mensaje de error basado en el código de error de firebase auth.
									// https://firebase.google.com/docs/auth/admin/errors?hl=es-419
									switch (error.code) {
										case "auth/invalid-display-name":
											message =
												"El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una string que no esté vacía.";
											break;
										case "auth/invalid-email":
											message =
												"El valor que se proporcionó para la propiedad de usuario email no es válido. Debe ser una dirección de correo electrónico de string.";
											break;
										case "auth/invalid-password":
											message =
												"El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres.";
											break;
										case "auth/email-already-exists":
											message =
												"Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.";
											break;
										default:
											message = "Error no manejado. Error Message: " + error.message;
											break;
									}
									res.status(400).send(JSON.stringify({ error: message }));
								});
						} else {
							res.status(400).send(
								JSON.stringify({
									error: "El email ya está siendo utilizado."
								})
							);
						}
					} else {
						Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
						res.status(500).send({ error: error });
					}
				})
				.catch((error) => {
					Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
					res.status(500).send({ error: error });
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send({ error: error });
		}
	};
};

// POST: entrega información sobre si existe o no un usuario registrado.
Auth.ValidateUser = function (firebaseAdmin) {
	return function (req, res) {
		// valida si se está enviando en el body el mail
		if (!req.body.email) return res.status(400).send("No se ha especificado un email para validar.");

		try {
			firebaseAdmin
				.auth()
				.getUserByEmail(req.body.email)
				.then((user) => {
					//si el usuario existe, arroja code:200 y un boolean true
					res.status(200).send(JSON.stringify({ user: true }));
				})
				.catch((error) => {
					if (error.code === "auth/user-not-found") {
						//si el usuario no existe, arroja code:200 y un boolean false
						res.status(200).send(JSON.stringify({ user: false }));
					} else {
						Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
						res.status(500).send(
							JSON.stringify({
								error: error
							})
						);
					}
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send(
				JSON.stringify({
					error: error
				})
			);
		}
	};
};

// POST: entrega información sobre si existe o no un usuario registrado.
Auth.GetUser = function (firebaseAdmin) {
	return function (req, res) {
		if (!req.body.email) return res.status(400).send("No se ha especificado un email como query url.");

		try {
			firebaseAdmin
				.auth()
				.getUserByEmail(req.body.email)
				.then((user) => {
					// devuelve un booleano y los datos del usuario
					res.status(200).send(
						JSON.stringify({
							user: true,
							data: {
								uid: user.uid,
								email: user.email,
								displayName: user.displayName
							}
						})
					);
				})
				.catch((error) => {
					if (error.code === "auth/user-not-found") {
						res.status(200).send(JSON.stringify({ user: false }));
					} else {
						Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
						res.status(500).send(
							JSON.stringify({
								error: error
							})
						);
					}
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send({ error: error });
		}
	};
};

// GET: lista de usuarios existentes en la DB de firebase.
Auth.GetAllUsers = function (firebaseAdmin) {
	var list = [];

	return function (req, res) {
		list = [];
		try {
			// trae una lista de 1000 usuarios. Este método de firebase se encuentra en la documentación
			// como una función recursiva, no se logró implementar así y desafortunadamente trae un número
			// fijo de usuarios.
			firebaseAdmin
				.auth()
				.listUsers(1000)
				.then(function (listUsersResult) {
					listUsersResult.users.forEach(function (userRecord) {
						// deconstruye la información de firebase en un nuevo objeto reducido
						list.push({
							uid: userRecord.uid,
							email: userRecord.email,
							displayName: userRecord.displayName
						});
					});
					// devuelve la lista de usuarios
					res.status(200).send(JSON.stringify({ users: list }));
				})
				.catch(function (error) {
					Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
					res.status(500).send(
						JSON.stringify({
							error: error
						})
					);
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send(
				JSON.stringify({
					error: error
				})
			);
		}
	};
};

// POST: elimina un usuario desde su email.
Auth.DeleteUSer = function (firebaseAdmin) {
	return function (req, res) {
		if (!req.body.email) return res.status(400).send("No se ha especificado un usuario.");

		try {
			// hace un fetch a validateUser para saber si existe el usuario
			fetch(process.env.HOST + "api/auth/getUser", {
				method: "POST",
				body: JSON.stringify({ email: req.body.email }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			})
				.then((res) => res.json())
				.then(function (response) {
					// si la respuesta se devolvió correctamente, != null
					if (response) {
						//si response.user = true que significa que el usuario existe
						// en caso que no exista, devuelve un error
						if (response.user) {
							// elimina el usuario basado en su uid
							firebaseAdmin
								.auth()
								.deleteUser(response.data.uid)
								.then(function () {
									// elimina los datos del usuario enlazados en la database
									firebaseAdmin.database().ref("/Users").child(response.data.uid).remove();
									// envía el estado ok
									res.status(200).send(JSON.stringify({ status: "Usuario eliminado." }));
								})
								.catch(function (error) {
									Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
									res.status(500).send({ error: error });
								});
						} else {
							res.status(400).send(
								JSON.stringify({
									error: "El email no existe."
								})
							);
						}
					} else {
						Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
						res.status(500).send({ error: error });
					}
				});
		} catch (error) {
			Log.ErrorLog("Algo ha fallado en el servidor! Error: " + error);
			res.status(500).send({ error: error });
		}
	};
};

module.exports = Auth;
