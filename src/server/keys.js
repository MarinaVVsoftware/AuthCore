const dotenv = require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
module.exports = {
  config: {
    database_url: process.env.DATABASE_URL,
    session_secret: process.env.SESSION_SECRET
  },
  server_credentials: {
    type: process.env.SERVER_TYPE,
    project_id: process.env.SERVER_PROJECT_ID,
    private_key_id: process.env.SERVER_PRIVATE_KEY_ID,
    private_key: process.env.SERVER_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.SERVER_CLIENT_EMAIL,
    client_id: process.env.SERVER_CLIENT_ID,
    auth_uri: process.env.SERVER_AUTH_URI,
    token_uri: process.env.SERVER_TOKER_URI,
    auth_provider_x509_cert_url: process.env.SERVER_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.SERVER_CLIENT_X509_CERT_URL
  }
};
