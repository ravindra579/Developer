const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options, () => {
  console.log('Connected to MongoDB');
  server = http.createServer({}, app);

  server.listen(config.port, () => {
    console.info(`--- 🌟  Started --- http://localhost:${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
