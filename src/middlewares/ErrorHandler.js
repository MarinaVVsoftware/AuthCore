/**
 * Middleware: Error Handler
 * Middleware para manejo de errores. Se ejecuta mediante
 * la función next() dentro de cada endpoint o route.
 */
module.exports = app => {
  app.use((err, req, res, next) => {
    try {
      let bodyErrors = [];
      let paramsErrors = [];
      let queryErrors = [];

      /* En caso que sea un error en el body del endpoint */
      if (err.validationErrors) {
        /* Mapea los errores de body */
        if (err.validationErrors.body)
          bodyErrors = err.validationErrors.body.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
        /* Mapea los errores de params */
        if (err.validationErrors.params)
          paramsErrors = err.validationErrors.params.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });

        /* Mapea los errores de querys */
        if (err.validationErrors.query)
          queryErrors = err.validationErrors.query.map(element => {
            return {
              datapath: element.dataPath,
              type: element.params.type,
              message: element.message
            };
          });
      }

      /* En caso que se ejecute un NewError() */
      if (err.statusCode && err.message) {
        res.status(err.statusCode).send({ error: err.message });
      } else if (err.validationErrors) {
        res.status(400).send({
          bodyErrors: bodyErrors,
          paramsErrors: paramsErrors,
          queryErrors: queryErrors
        });
      } else {
        /* En caso que no se especifique el error */
        res
          .status(400)
          .send({ error: "Something Went Wrong! error attached: " + err });
      }
    } catch (error) {
      res.status(500).send({ error: "El validador ha fallado: " + error });
    }
  });
};
