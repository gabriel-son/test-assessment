/**
 * @file Handles all request in relation to actor
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */

/**
 * Express Router Object
 */

const router = require('express').Router();
/**
 * Actors Controller
 */
const {
  updateActor,
  getAllActors,
  getStreak,
} = require('../controllers/actors');

/**
 * Request object schema validation
 */
const {
  updateActorSchema,
} = require('../utilities/validator/schema/Authentication');
module.exports = () => {
// Routes related to actor.
  /**
   * @description This route handles the request for updating the avatar URL of the actor
   */
  router.put('/', updateActorSchema(), updateActor);
  /**
   * @description This route handles the request for returning the actor records ordered by the total number of events
   */
  router.get('/', getAllActors);

  /**
   * @description This route handles the request for returning the actor records ordered by the maximum streak
   */
  router.put('/streak', getStreak);

  return router;
}
