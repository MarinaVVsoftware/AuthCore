const fetch = require("node-fetch");
require("firebase/auth");

// Controller - Auth
const Auth = {};

Auth.Auth = (newError, firebaseClient, generateToken) => {
  return (req, res, next) => {
    const user = req.body.email;
    const password = req.body.password;
    const { emails } = JSON.parse(process.env.DEV_EMAILS);

    if (!emails.includes(user))
      return next(newError("Email de autenticación incorrecto.", 400));
    else
      try {
        firebaseClient
          .auth()
          .signInWithEmailAndPassword(user, password)
          .then(result => {
            // Genera un token y regresa un objeto encriptado.
            const token = generateToken({ uid: result.user.uid });
            res.status(200).send(JSON.stringify({ token, error: null }));
          })
          .catch(error => {
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
                message =
                  "El servidor no admite el tipo de sesión. Contacte a soporte.";
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
                message =
                  "Error no manejado: invalid-verification-code. Contacte a soporte.";
                break;
              case "auth/invalid-verification-id":
                message =
                  "Error no manejado: invalid-verification-id. Contacte a soporte.";
                break;

              default:
                message =
                  "Error no manejado: " +
                  error.code +
                  ". Contacte a soporte. Error Message: " +
                  error.message;
                break;
            }
            next(newError(message, 400));
          });
      } catch (error) {
        next(newError(error, 500));
      }
  };
};

Auth.Login = (newError, firebaseClient, generateToken) => {
  return (req, res, next) => {
    const user = req.body.email;
    const password = req.body.password;

    try {
      firebaseClient
        .auth()
        .signInWithEmailAndPassword(user, password)
        .then(result => {
          // Genera un token y regresa un objeto encriptado.
          const token = generateToken({ uid: result.user.uid });
          res.status(200).send(JSON.stringify({ token, error: null }));
        })
        .catch(function(error) {
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
              message =
                "El servidor no admite el tipo de sesión. Contacte a soporte.";
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
              message =
                "Error no manejado: invalid-verification-code. Contacte a soporte.";
              break;
            case "auth/invalid-verification-id":
              message =
                "Error no manejado: invalid-verification-id. Contacte a soporte.";
              break;

            default:
              message =
                "Error no manejado: " +
                error.code +
                ". Contacte a soporte. Error Message: " +
                error.message;
              break;
          }

          next(newError(message, 400));
        });
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Auth.PutUser = (newError, firebaseAdmin, host) => {
  return (req, res, next) => {
    const email = decodeURIComponent(req.params.email);
    const user = req.body;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* Valida manualmente si el email es un string alfanumérico válido.
    decodifica el string de la uri. %40 significa arroba. */
    if (!emailRegex.test(email))
      next(newError("el param email no es un email válido.", 400));
    else
      try {
        // creación de la cuenta en firebase/auth, luego guarda una referencia al usuario en
        // la firebase/database.
        // hace un fetch a validateUser para saber si existe el usuario
        fetch(
          host +
            "/api/auth/users/" +
            decodeURIComponent(req.params.email) +
            "/validate/"
        )
          .then(res => res.json())
          .then(response => {
            // si la respuesta se devolvió correctamente, != null
            if (response) {
              //si response.user = false que significa que no existe el usuario
              // en caso que exista, actualiza al usuario con los nuevos datos
              if (!response.user) {
                firebaseAdmin
                  .auth()
                  .createUser({
                    email: user.email,
                    emailVerified: false,
                    password: user.password,
                    displayName: user.displayName,
                    disabled: false
                  })
                  .then(userRecord => {
                    // aqui se guarda en la database el usuario para permitir login por usuario
                    var ref = firebaseAdmin.database().ref("/Users");
                    ref.child(userRecord.uid).set({
                      displayName: user.displayName,
                      email: user.email
                    });

                    // envía un code:200 con un mensaje del estado del proceso
                    res.status(200).send(
                      JSON.stringify({
                        state: "Usuario creado: " + user.displayName,
                        error: null
                      })
                    );
                  })
                  .catch(error => {
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
                        message =
                          "Error no manejado. Error Message: " + error.message;
                        break;
                    }
                    next(newError(message, 400));
                  });
              } else {
                firebaseAdmin
                  .auth()
                  .updateUser(response.uid, {
                    email: req.body.email,
                    password: req.body.password,
                    displayName: req.body.displayName
                  })
                  .then(userRecord => {
                    // aqui se guarda en la database el usuario para permitir login por usuario
                    var ref = firebaseAdmin.database().ref("/Users");
                    ref.child(userRecord.uid).update({
                      displayName: req.body.displayName,
                      email: req.body.email
                    });

                    // envía un code:200 con un mensaje del estado del proceso
                    res.status(200).send(
                      JSON.stringify({
                        state: "Usuario Actualizado: " + req.body.displayName,
                        error: null
                      })
                    );
                  })
                  .catch(function(error) {
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
                        message =
                          "Error no manejado. Error Message: " + error.message;
                        break;
                    }
                    next(newError(message, 400));
                  });
              }
            } else {
              console.log({ error: error });
              next(newError(error, 500));
            }
          })
          .catch(error => {
            console.log({ error: error });
            next(newError(error, 500));
          });
      } catch (error) {
        console.log({ error: error });
        next(newError(error, 500));
      }
  };
};

Auth.ValidateUser = (newError, firebaseAdmin) => {
  return (req, res, next) => {
    const email = decodeURIComponent(req.params.email);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* Valida manualmente si el email es un string alfanumérico válido.
    decodifica el string de la uri. %40 significa arroba. */
    if (!emailRegex.test(email))
      next(newError("el param email no es un email válido.", 400));
    else
      try {
        firebaseAdmin
          .auth()
          .getUserByEmail(email)
          .then(user => {
            //si el usuario existe, arroja code:200 y un boolean true
            res
              .status(200)
              .send(JSON.stringify({ user: true, uid: user.uid, error: null }));
          })
          .catch(error => {
            if (error.code === "auth/user-not-found") {
              //si el usuario no existe, arroja code:200 y un boolean false
              res
                .status(200)
                .send(JSON.stringify({ user: false, error: null }));
            } else next(newError({ error: error }, 500));
          });
      } catch (error) {
        next(newError(error, 500));
      }
  };
};

Auth.GetUser = (newError, firebaseAdmin) => {
  return (req, res, next) => {
    const email = decodeURIComponent(req.params.email);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* Valida manualmente si el email es un string alfanumérico válido.
    decodifica el string de la uri. %40 significa arroba. */
    if (!emailRegex.test(email))
      next(newError("el param email no es un email válido.", 400));
    else
      try {
        firebaseAdmin
          .auth()
          .getUserByEmail(email)
          .then(user => {
            // devuelve un booleano y los datos del usuario
            res.status(200).send(
              JSON.stringify({
                user: true,
                data: {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName
                },
                error: null
              })
            );
          })
          .catch(error => {
            if (error.code === "auth/user-not-found") {
              res
                .status(200)
                .send(JSON.stringify({ user: false, error: null }));
            } else next(newError(error, 500));
          });
      } catch (error) {
        next(newError(error, 500));
      }
  };
};

Auth.GetAllUsers = (newError, firebaseAdmin) => {
  var list = [];

  return (req, res, next) => {
    list = [];
    try {
      // trae una lista de 1000 usuarios. Este método de firebase se encuentra en la documentación
      // como una función recursiva, no se logró implementar así y desafortunadamente trae un número
      // fijo de usuarios.
      firebaseAdmin
        .auth()
        .listUsers(1000)
        .then(function(listUsersResult) {
          listUsersResult.users.forEach(function(userRecord) {
            // deconstruye la información de firebase en un nuevo objeto reducido
            list.push({
              uid: userRecord.uid,
              email: userRecord.email,
              displayName: userRecord.displayName
            });
          });
          // devuelve la lista de usuarios
          res.status(200).send(JSON.stringify({ users: list, error: null }));
        })
        .catch(error => {
          next(newError(error, 500));
        });
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Auth.DeleteUSer = (newError, firebaseAdmin, host) => {
  return (req, res, next) => {
    const email = decodeURIComponent(req.params.email);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* Valida manualmente si el email es un string alfanumérico válido.
    decodifica el string de la uri. %40 significa arroba. */
    if (!emailRegex.test(email))
      next(newError("el param email no es un email válido.", 400));
    else
      try {
        // hace un fetch a validateUser para saber si existe el usuario
        fetch(host + "/api/auth/users/" + req.params.email + "/validate/")
          .then(res => res.json())
          .then(response => {
            // si la respuesta se devolvió correctamente, != null
            if (response) {
              //si response.user = true que significa que el usuario existe
              // en caso que no exista, devuelve un error
              if (response.user) {
                // elimina el usuario basado en su uid
                firebaseAdmin
                  .auth()
                  .deleteUser(response.uid)
                  .then(() => {
                    // elimina los datos del usuario enlazados en la database
                    firebaseAdmin
                      .database()
                      .ref("/Users")
                      .child(response.uid)
                      .remove();
                    // envía el estado ok
                    res.status(200).send(
                      JSON.stringify({
                        status: "Usuario eliminado.",
                        error: null
                      })
                    );
                  })
                  .catch(error => {
                    console.log({ error: error });
                    next(newError(error, 500));
                  });
              } else {
                next(newError("El email no existe.", 400));
              }
            } else {
              console.log({ error: error });
              next(newError(error, 500));
            }
          });
      } catch (error) {
        console.log({ error: error });
        next(newError(error, 500));
      }
  };
};

module.exports = Auth;
