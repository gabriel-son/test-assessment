/**
 * @file Handles all request in relation to events
 * @author Gabriel <gabrielsonchia@gmail.com> <29/05/2021 02:37am>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <31/05/2021 07:12pm>
 */

/**
 * Express Router Object
 */

const router = require('express').Router();
/**
 * Events Controller
 */
const { addEvent, getAllEvents, getByActor } = require('../controllers/events.js');

/**
 * Request object schema validation
 */
const {
  createEventSchema,
  filterEventsSchema,
} = require('../utilities/validator/schema/Authentication.js');

module.exports = () => {
// Routes related to events.
  /**
   * @description This route handles the request for adding new events
   */
  router.post('/', createEventSchema(), addEvent);

  /**
   * @description This route handles the request for returning all the events
   */
  router.get('/', getAllEvents);

  /**
   * @description This route handles the request for returning the event records filtered by the actor ID
   */
  router.get('/actors/:actorID', filterEventsSchema(), getByActor);

  return router;
}
