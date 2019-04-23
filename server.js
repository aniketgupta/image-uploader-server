// Importing the core modules ------------------- //
require('dotenv').config();
const Hapi = require('hapi');
const config = require('config');
const routes = require('hapi-auto-routes');
const mongoose = require('mongoose');
const hapiauthjwt = require('hapi-auth-jwt2');
const handlebars = require('handlebars');
const good = require('good');
const goodConsole = require('good-console');
const goodFile = require('good-file');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const Pack = require('./package');

// Importing services to be initialized on startup //
const initDBServices = require('./services/db/index');

// Setting up Server ----------------------------- //
const server = new Hapi.Server({
});
server.connection({
  host: config.server.host,
  port: config.server.port,
  routes: {
    cors: {
      origin: ['*'],
    },
    log: true,
  },
});

// Setting Mongoose to use ES6 native promises.
mongoose.Promise = global.Promise;

// CONNECT TO DB ------------------------------- //
mongoose.connect(config.database.uri, config.database.opts);
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const db = mongoose.connection;

db.on('error', () => {
  console.error('Connection to db failed!');
  process.exit(0);
});

db.on('connected', () => {
  // On successfull connection, log connection details
  if (process.env.NODE_ENV !== 'production') {
    console.info(`MongoDB::Connected at ${config.database.uri}`);
  } else {
    console.info('Successfully connected to DB');
  }
  // start the server
  // eslint-disable-next-line
  startServer();
});

db.on('disconnected', (err) => {
  console.error('Connection terminated to db', err);
  process.exit(0);
});

// HELPER FUNCTIONS ----------------------------- //
function startServer() {
  // Initiating services
  global.services = {
    db: initDBServices(server),
  };

  // Registering plugins
  const requiredHapiPlugins = [
    hapiauthjwt,
    inert,
    vision,
    {
      register: hapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          contact: {
            name: 'Aniket Gupta',
            email: 'aniket.gupta309@gmail.com',
          },
          version: Pack.version,
        },
        grouping: 'tags',
      },
    },
    {
      register: good,
      options: {
        reporters: [{
          reporter: goodConsole,
          config: {
            format: 'MMMM Do YYYY h:mm:ss a',
            utc: false,
            color: true,
          },
          events: {
            response: '*',
            request: '*',
            log: '*',
            error: '*',
            info: '*',
            db: '*',
          },
        }, {
          reporter: goodFile,
          events: {
            response: '*',
            request: '*',
            log: '*',
            error: '*',
            ops: '*',
            db: '*',
          },
          config: {
            path: `${__dirname}/logs`,
            rotate: 'daily',
          },
        }],
      },
    },
  ];

  server.register(requiredHapiPlugins, (err) => {
    if (err) {
      console.error('Error in registering one or more plugins.');
      // throw err;
      process.exit(0);
    } else {
      server.views({
        engines: {
          html: handlebars,
        },
        relativeTo: __dirname,
        path: 'static',
      });

      server.route({
        method: 'GET',
        path: '/{filename*}',
        handler: {
          directory: {
            path: `${__dirname}/static`,
            listing: false,
            index: false,
          },
        },
      });

      routes.bind(server).register({
        pattern: `${__dirname}/routes/**/*.js`,
      });

      server.start((startErr) => {
        if (startErr) {
          console.error(startErr);
        } else {
          console.info(`Server started at: ${server.info.uri}`);
        }
      });
    }
  });
}

module.exports = server;
