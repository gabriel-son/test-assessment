/**
 * @file receives incoming client request concerning events and
 * passes it over to the service layer for processing
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */
const {
  SuccessResponse,
  CreatedResponse,
} = require('../utilities/core/ApiResponse');
const exec = require('../utilities/core/catchAsync');
const {
  getAllEvents,
  getByActor,
  addEvent,
  eraseEvents,
} = require('../services/Events');
/**
 * @desc Controller to handle retrieval of all events
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getAllEvents = exec(async (req, res) => {
  const response = await getAllEvents();
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse('Events retrieved successfully', response).send(res);
});

/**
 * @desc Controller to handle creating an event
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.addEvent = exec(async (req, res) => {
  const { id, type, actor, repo, created_at } = req.body;
  const response = await addEvent(id, type, actor, repo, created_at);
  /**
   * returning a successful response if the operation was successful
   */
  new CreatedResponse('Event added successfully', response).send(res);
});


/**
 * @desc Controller to handle returning the event records filtered by the actor ID
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getByActor = exec(async (req, res) => {
  const {actorID} = req.params;
  const response = await getByActor(actorID);
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse("Actor's events retrieved successfully", response).send(
    res
  );
});
/**
 * @desc Controller to handle erasing all the events
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.eraseEvents = exec(async (req, res) => {
  await eraseEvents();
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse('Events erased successfully').send(res);
});

