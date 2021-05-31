/**
 * @file Defines the basic configuration of the Express Framework @see {@link https://expressjs.com/} and Mongoose
 * ORM @see {@link https://mongoosejs.com} connection to MONGODB database. Then it exports the config as module.
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const routeHandler = require('./routes/index.js');
const {
  ApiError,
  InternalError,
  NotFoundError,
} = require('./utilities/core/ApiError');
// const events = require('./routes/events.js');
// const eraseEvents = require('./routes/eraseEvents.js');
// const actors = require('./routes/actor.js');
module.exports = (config) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(helmet());

  app.use(morgan('dev'));
  app.use(express.json({ limit: '20mb', extended: true }));
  app.use(express.urlencoded({ limit: '20mb', extended: false }));
  /**
   * Adds application routes middleware from the routes index which groups all routes together
   */
  app.use('/', routeHandler());
  // app.use('/events', events());
  // app.use('/erase', eraseEvents());
  // app.use('/actors', actors());
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(new NotFoundError('Resource Not Found'));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // Checks if err is thrown by us and handled to the ApiError Class, if not we throw and handle an internal server error
    if (err instanceof ApiError) {
      // TODO: log error to a file
      ApiError.handle(err, res);
    } else {
      ApiError.handle(new InternalError(err), res);
    }
    // log error to the console for debugging purpose
    config.logger.error(`app---- ${err}`);
    console.log(err)
  });

  return app;
};
