const Log = {};

/** función que ayuda a mostrar errores en la consola. */
Log.ErrorLog = function(message) {
  // Rojo
  console.log("\x1b[31m", message);
};

/** función para mostrar mensajes de debug en el server */
Log.Success = function(message) {
  // Verde
  console.log("\x1b[32sm", message);
};

/** función para notificar procesos correctos del servidor */
Log.Debug = function(message) {
  // Amarillo
  console.log("\x1b[33m", message);
};

module.exports = Log;
