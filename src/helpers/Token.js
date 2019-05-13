const jwt = require('jsonwebtoken');
const Token = {};
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(__dirname, './keys/private.key'), 'utf8');

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

module.exports = Token;
