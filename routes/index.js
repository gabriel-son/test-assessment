/**
 * @file Organises all application route for all opertions and
 *  exports the Express Router as module
 * @see {@link https://expressjs.com/en/guide/routing.html#expressRouter}
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */

const router = require('express').Router();
const events = require('./events.js');
const eraseEvents = require('./eraseEvents.js');
const actors = require('./actor.js');

module.exports = () => {
  router.use('/events', events());
  router.use('/erase', eraseEvents());
  router.use('/actors', actors());

  return router;
};
