const mongoose = require('mongoose');
const fs = require('fs');
const appRoot = require('app-root-path');

var ca = fs.readFileSync(appRoot + "/rds-combined-ca-bundle.pem");
// var privateKey = ;

const init = () => {
  mongoose.set('debug', true);
  
  // console.log(process.env.SSH_AUTH_SOCK);
  
  if(process.env.DB_USE_TUNNEL === 'true') {
    
    const sshTunnelConfig = {
      agent: process.env.SSH_AUTH_SOCK,
      username: process.env.SSH_TUNNEL_USER,
      privateKey: fs.readFileSync(appRoot + "/FestivalDocDB.pem"),
      host: process.env.SSH_TUNNEL_HOST,
      port: process.env.SSH_TUNNEL_PORT,
      dstHost: process.env.DOCUMENTDB_CLUSTER_ENDPOINT,
      dstPort: process.env.DOCUMENTDB_CLUSTER_PORT,
      localHost: process.env.DB_URL_LOCAL,
      localPort: process.env.DB_PORT_LOCAL,
    };
    
    const tunnel = require('tunnel-ssh');
    tunnel(sshTunnelConfig, (error, server) => {
      
      if(error) {
          console.log("SSH connection error: ", error);
      }
      
      // console.log(server);
      console.log('Tunnel ok');
      
      mongoose
        .connect(process.env.DB_MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DOCUMENTDB_CLUSTER_DB_NAME,
            useCreateIndex: true,
            ssl: false,
            sslValidate: false,
            // sslAllowInvalidHostnames: true,
            // ssl: false,
            tlsInsecure: true,
            // sslValidate: false,
            // checkServerIdentity: false,
            sslCA: ca,
            authMechanism: 'SCRAM-SHA-1',
            auth: {
              user: process.env.DB_USER_REMOTE,
              password: process.env.DB_PASS_REMOTE
            },
            user: process.env.DB_USER_REMOTE,
            pass: process.env.DB_PASS_REMOTE,
            tlsAllowInvalidHostnames: true,
            tlsAllowInvalidCertificates: true,
            // sslAllowInvalidHostnames: true,
            // sslAllowInvalidCertificates: true,
        })
        .catch((err) => {
          console.error('error: ' + err.stack);
          process.exit(1);
        });
      mongoose.connection.on('open', () => {
        console.log('connected to database');
      });
    });
    
  }
  else {
    mongoose
      .connect(process.env.DB_ATLAS_URL, {
          useNewUrlParser: true,
          createIndexes: true,
          // useUnifiedTopology: true,
      })
      .catch((err) => {
        console.error('error: ' + err.stack);
        process.exit(1);
      });
    mongoose.connection.on('open', () => {
      console.log('connected to database');
    });
  }
  
  
};

mongoose.Promise = global.Promise;

module.exports = init;
