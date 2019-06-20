/**
 * Importar la función y ejecutarlo dentro de next()
 * @param {string} errorMessage Mensaje de error
 * @param {number} statusCode Código de error
 */
function newError(errorMessage, statusCode) {
  const err = new Error(
    errorMessage &&
    (typeof errorMessage === "string" || typeof errorMessage === "object")
      ? errorMessage
      : "Ops! Something went wrong"
  );
  err.statusCode = statusCode ? statusCode : 400;
  return err;
}

module.exports = newError;
