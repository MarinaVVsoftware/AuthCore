require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
if (process.env.SERVER_PRIVATE_KEY) {
  module.exports = {
    env: {
      local: {
        host: process.env.LOCAL_HOST,
        port: process.env.LOCAL_PORT
      },
      dev: {
        host: process.env.DEV_HOST,
        port: process.env.DEV_PORT
      },
      prod: {
        host: process.env.PROD_HOST,
        port: process.env.PROD_PORT
      },
      NODE_ENV: process.env.NODE_ENV
    },
    config: {
      database_url: process.env.DATABASE_URL,
      session_secret: process.env.SESSION_SECRET
    },
    firebaseAdmin: {
      keys: {
        type: process.env.SERVER_TYPE,
        project_id: process.env.SERVER_PROJECT_ID,
        private_key_id: process.env.SERVER_PRIVATE_KEY_ID,
        private_key: process.env.SERVER_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.SERVER_CLIENT_EMAIL,
        client_id: process.env.SERVER_CLIENT_ID,
        auth_uri: process.env.SERVER_AUTH_URI,
        token_uri: process.env.SERVER_TOKER_URI,
        auth_provider_x509_cert_url:
          process.env.SERVER_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.SERVER_CLIENT_X509_CERT_URL
      },
      database: {
        database_url: process.env.SERVER_DATABASE_URL,
        session_secret: process.env.SERVER_SESSION_SECRET
      }
    },
    firebaseClient: {
      apiKey: process.env.CLIENT_API_KEY,
      authDomain: process.env.CLIENT_AUTH_DOMAIN,
      databaseURL: process.env.CLIENT_DATABASE_URL,
      projectId: process.env.CLIENT_PROJECT_ID,
      storageBucket: process.env.CLIENT_STORAGE_BUCKET,
      messagingSenderId: process.env.CLIENT_MESSAGING_SENDER_ID
    }
  };
} else {
  module.exports = null;
}
