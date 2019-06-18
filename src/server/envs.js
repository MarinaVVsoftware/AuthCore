require("dotenv").config();

// se importan los datos sensibles del archivo .env a un objeto
// que la app pueda usar amigablemente.
if (process.env.LOCAL_HOST) {
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
      NODE_ENV: process.env.NODE_ENV,
      DEBUG_ROUTEMAP: process.env.DEBUG_ROUTEMAP
    },
    firebase: {
      dev: {
        admin: {
          type: process.env.DEV_SERVER_TYPE,
          project_id: process.env.DEV_SERVER_PROJECT_ID,
          private_key_id: process.env.DEV_SERVER_PRIVATE_KEY_ID,
          private_key: process.env.DEV_SERVER_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.DEV_SERVER_CLIENT_EMAIL,
          client_id: process.env.DEV_SERVER_CLIENT_ID,
          auth_uri: process.env.DEV_SERVER_AUTH_URI,
          token_uri: process.env.DEV_SERVER_TOKER_URI,
          auth_provider_x509_cert_url:
            process.env.DEV_SERVER_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.DEV_SERVER_CLIENT_X509_CERT_URL
        },
        client: {
          apiKey: process.env.DEV_CLIENT_API_KEY,
          authDomain: process.env.DEV_CLIENT_AUTH_DOMAIN,
          databaseURL: process.env.DEV_CLIENT_DATABASE_URL,
          projectId: process.env.DEV_CLIENT_PROJECT_ID,
          storageBucket: process.env.DEV_CLIENT_STORAGE_BUCKET,
          messagingSenderId: process.env.DEV_CLIENT_MESSAGING_SENDER_ID
        },
        database: {
          database_url: process.env.DEV_SERVER_DATABASE_URL
        }
      },
      prod: {
        admin: {
          type: process.env.PROD_SERVER_TYPE,
          project_id: process.env.PROD_SERVER_PROJECT_ID,
          private_key_id: process.env.PROD_SERVER_PRIVATE_KEY_ID,
          private_key: process.env.PROD_SERVER_PRIVATE_KEY.replace(
            /\\n/g,
            "\n"
          ),
          client_email: process.env.PROD_SERVER_CLIENT_EMAIL,
          client_id: process.env.PROD_SERVER_CLIENT_ID,
          auth_uri: process.env.PROD_SERVER_AUTH_URI,
          token_uri: process.env.PROD_SERVER_TOKER_URI,
          auth_provider_x509_cert_url:
            process.env.PROD_SERVER_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.PROD_SERVER_CLIENT_X509_CERT_URL
        },
        client: {
          apiKey: process.env.PROD_CLIENT_API_KEY,
          authDomain: process.env.PROD_CLIENT_AUTH_DOMAIN,
          databaseURL: process.env.PROD_CLIENT_DATABASE_URL,
          projectId: process.env.PROD_CLIENT_PROJECT_ID,
          storageBucket: process.env.PROD_CLIENT_STORAGE_BUCKET,
          messagingSenderId: process.env.PROD_CLIENT_MESSAGING_SENDER_ID
        },
        database: {
          database_url: process.env.PROD_SERVER_DATABASE_URL
        }
      }
    }
  };
} else {
  module.exports = null;
}
