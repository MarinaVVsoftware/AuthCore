const jwt = require('jsonwebtoken');
const Token = {};
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, './keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, './keys/public.key'), 'utf8');

// Loguea el tokenData y te retorna el token encriptado
// Utiliza un privateKey(authcore) y publicKey(novocore).
Token.generateToken = (tokenData) => {
	return jwt.sign(tokenData, privateKey, {
		/*issuer: 'Marina v&v',
		subject: 'sistemas@sistemas.com',
		audience: 'novonautica.com',*/
		algorithm: 'RS256'
	});
};

// Toma el header y decodifica el token para ver si existe.
Token.validateToken = (header) => {
	var isSuccess = false;
	const token = header;
	if (!token) return isSuccess;
	// Quita la palabra "Bearer" propia de JWT
	const tokenFormatted = token.replace('Bearer', '');
	// Verifica el token
	return jwt.verify(tokenFormatted, publicKey, function(err, user) {
		return err ? isSuccess : !isSuccess;
	});
};

// Recibe el header "authorization" y lo valida con la función "validateToken"
Token.auth = () => {
	return (req, res, next) => {
		if (!Token.validateToken(req.headers['authorization'])) {
			res.status(400).send({ error: 'No se ha podido ingresar' });
		} else {
			//Utiliza la función de middleware propio de express
			next();
		}
	};
};

module.exports = Token;
