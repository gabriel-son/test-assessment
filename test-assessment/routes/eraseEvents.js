/**
 * @file Handles all request in relation to erasing events
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 06:09pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */

/**
 * Express Router Object
 */

const router = require('express').Router();
/**
 * Events Controller
 */
const { eraseEvents } = require('../controllers/events');

module.exports = () => {
// Routes related to erase events.
/**
 * @description This route handles the request for erasing all the events
 */
router.post('/', eraseEvents);

return  router;
}
