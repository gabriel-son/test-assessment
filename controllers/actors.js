/**
 * @file receives incoming client request concerning actors and
 * passes it over to the service layer for processing
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */

const {
  SuccessResponse,
} = require('../utilities/core/ApiResponse');
const exec = require('../utilities/core/catchAsync');
const { getAllActors, getStreak, updateActor } = require('../services/Actors');
/**
 * @desc Controller to handle retrieval of all actors
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getAllActors = exec(async (req, res) => {
  const response = await getAllActors();
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse('Actors retrieved successfully', response).send(res);
});


/**
 * @desc Controller to handle updating an actor's avater
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.updateActor = exec(async (req, res) => {
  const {id, avatar_url} = req.body.actor;
  const response = await updateActor(id, avatar_url);
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse("Actor's records updated successfully", response).send(
    res
  );
});

/**
 * @desc Controller to handle returning the actors records ordered by the maximum streak
 * @param {object} req - The request object representing the HTTP request
 * @param {object} res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getStreak = exec(async (req, res) => {
  const response = await getStreak();
  /**
   * returning a successful response if the operation was successful
   */
  new SuccessResponse("Actor's records retrieved successfully", response).send(
    res
  );
});

