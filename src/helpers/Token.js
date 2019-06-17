const jwt = require("jsonwebtoken");
const Token = {};
const keys = {};

// Loguea el tokenData y te retorna el token encriptado
// Utiliza un privateKey(authcore) y publicKey(novocore).

Token.keys = (private, public) => {
  if (private && public) {
    keys.private = private;
    keys.public = public;
    return true;
  } else {
    return false;
  }
};

Token.generateToken = tokenData => {
  return jwt.sign(tokenData, keys.private, {
    expiresIn: "4d",
    // Source: https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference
    // Algoritmo RS000 utiliza dos keys, una public y una private.
    // Algoritmo HS000 utiliza solo una key compartida entre ambas funciones (generate y verify).
    algorithm: "RS256"
  });
};

// Toma el header y decodifica el token para ver si existe.
Token.validateToken = header => {
  var isSuccess = false;
  const token = header;
  if (!token) return isSuccess;

  // Quita la palabra "Bearer" propia de JWT
  const tokenFormatted = token.replace("Bearer", "");
  // Verifica el token
  return jwt.verify(
    tokenFormatted,
    keys.public,
    {
      expiresIn: "4d"
    },
    function(err, user) {
      return err ? isSuccess : !isSuccess;
    }
  );
};

// Recibe el header "authorization" y lo valida con la función "validateToken"
Token.auth = () => {
  return (req, res, next) => {
    if (!Token.validateToken(req.headers["authorization"])) {
      res.status(401).send({ error: "Error de autorización token inválido." });
    } else {
      //Utiliza la función de middleware propio de express
      next();
    }
  };
};

module.exports = Token;
