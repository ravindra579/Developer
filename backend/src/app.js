const express = require('express');
const httpStatus = require('http-status');
const ApiError = require('./api/v1/utils/ApiError');
const cors = require("cors")
const app = express();

// parse json request body
app.use(express.json());
app.use(cors());

// parse url-encoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Developer api');
});
app.use('/api/v1', require('./api/v1/routes'));

// send back a 404 error for any unknown api routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route Not Found'));
});

// convert error to ApiError before sending back to client
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    const apiError = err;
    return res.status(apiError.statusCode).json({
      status: apiError.statusCode,
      message: apiError.message,
    });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

// handle error
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

module.exports = app;
