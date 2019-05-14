const jwt = require('jsonwebtoken');
const Token = {};
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, 'keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, 'keys/public.key'), 'utf8');

// Loguea el tokenData y te retorna el token encriptado
// Utiliza un privateKey(authcore) y publicKey(novocore).
Token.generateToken = (tokenData) => {
	try {
		return jwt.sign(tokenData, privateKey, {
			/*issuer: 'Marina v&v',
			subject: 'sistemas@sistemas.com',
			audience: 'novonautica.com',*/
			algorithm: 'RS256'
		});
	} catch (error) {
		console.log(error);
	}
};

// Toma el header y decodifica el token para ver si existe.
Token.validateToken = (header) => {
	try {
		var isSuccess = false;
		const token = header;
		if (!token) return isSuccess;
		// Quita la palabra "Bearer" propia de JWT
		const tokenFormatted = token.replace('Bearer', '');
		// Verifica el token
		return jwt.verify(tokenFormatted, publicKey, function(err, user) {
			return err ? isSuccess : !isSuccess;
		});
	} catch (error) {
		console.log(error);
	}
};

// Recibe el header "authorization" y lo valida con la función "validateToken"
Token.auth = () => {
	return (req, res, next) => {
		try {
			if (!Token.validateToken(req.headers['authorization'])) {
				res.status(401).send({ error: 'Error de autorización token inválido.' });
			} else {
				//Utiliza la función de middleware propio de express
				next();
			}
		} catch (error) {
			console.log(error);
		}
	};
};

module.exports = Token;
