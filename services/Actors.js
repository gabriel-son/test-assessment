/**
 * @file Using the separation of concern principle, this file handles the business logic on Actors requests
 * @author Gabriel <gabrielsonchia@gmail.com> <29/05/2021 02:37am>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <31/05/2021 07:12pm>
 */

const { NotFoundError, InternalError } = require('../utilities/core/ApiError');
const Actor = require('../database/models').Actors;
/**
 * @class Actors
 * @classdesc a class responsible for handling the business logic on Actors requests
 */

class Actors {
  /**
   * @description Update an actor's record
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async updateActor(id, avatar_url) {
    const actorExist = await Actor.findOne({ where: { id } });

    if (!actorExist) {
      throw new NotFoundError("Actor doesn't exist. Check ID and try again")
    }

    const updatedActor = await Actor.update({
      avatar_url
    }, {
      where: {id: id},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    })

    console.log(updatedActor)
  }

  /**
   * @description Retrieve all actors record
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async getAllActors() {
  }
  /**
   * @description Retrieveing all the actors records ordered by the maximum streak
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async getStreak() {}
}

// exports class as a module
module.exports = Actors;
