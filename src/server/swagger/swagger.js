// instancia separada para swagger
var swaggerUi = require('swagger-ui-express');
const path = require('path');
const Log = require(path.resolve(__dirname, '../../helpers/Logs'));
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve('src/server/swagger/swagger.yaml'));
// const swaggerDocument = require('./swagger.json');

// opciones adicionales para swagger
var options = {
	explorer: true,
	customCss: '.swagger-ui .topbar { display: none }'
};

module.exports = (app, router) => {
	// genera archivos estáticos para hostear swagger
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
	app.use('/api/v1', router);

	Log.Success('Documentación Swagger instanciada correctamente.');
};
