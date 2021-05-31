/**
 * @file Using the separation of concern principle, this file handles the business logic on Events requests
 * @author Gabriel <gabrielsonchia@gmail.com> <29/05/2021 02:37am>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <31/05/2021 07:12pm>
 */

const { NotFoundError, InternalError, BadRequestError } = require('../utilities/core/ApiError');

const Event = require('../database/models').Events;
const Repo = require('../database/models').Repos;
const Actor = require('../database/models').Actors;
/**
 * @class Events
 * @classdesc a class responsible for handling the business logic on Events requests
 */
class Events {
  /**
   * @description Retrieval of all events
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async getAllEvents() {
    const events = await Event.findAll({ include: [{model: Actor, as: 'actor', attributes:[['actor_id','id'], 'login', 'avatar_url']}, {model: Repo, as: 'repo', attributes:[['repo_id','id'], 'name', 'url']}],
      attributes: ['type', 'id', 'created_at'], order: [
        ['id', 'ASC'],
      ],
    })

    return events
  }

  /**
   * @description Creating an event
   * @param {Number} id -  Event id
   * @param {String} type -  Event type
   * @param {Object} actor -  Event actor details
   * @param {Object} repo -  Event repo details
   * @param {Date} created_at -  Event time stamp
   * @return {Promise<{role: *}>}
   */
  static async addEvent(id, type, actor, repo, created_at) {
    const eventExist = await Event.findAll({
      where: {
        id: id,
      },
    });

    if (eventExist.length > 0) {
      throw new BadRequestError('Event with same ID already exists')
    }

    const event = await Event.create({
      type,
      id,
      created_at
    });

    if (!event) {
      throw new InternalError('An error occurred. Please try again')
    }

    const [eventActor, eventRepo] = await Promise.all([await Repo.create({
      name: repo.name,
      repo_id: repo.id,
      url: repo.url,
      event_id: id,
    }), await Actor.create({
      login: actor.login,
      actor_id: actor.id,
      avatar_url: actor.avatar_url,
      event_id: id,
    })]);
    if (!eventActor || !eventRepo) {
      throw new InternalError('An error occurred. Please try again')
    }

    return id;
  }

  /**
   * @description Returning the event records filtered by the actor ID
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async getByActor(actorId) {
    const events = await Event.findAll({ include: [{model: Actor, as: 'actor', attributes:[['actor_id','id'], 'login', 'avatar_url'], where:{
          actor_id: actorId,
        } }, {model: Repo, as: 'repo', attributes:[['repo_id','id'], 'name', 'url']}],
      attributes: ['type', 'id', 'created_at'], order: [
        ['id', 'ASC'],
      ],
    })

    if (events.length < 1) throw new NotFoundError('Actor ID not found. Check and try again')

    return events
  }

  /**
   * @description Erasing all the events
   * @param {Object} data -  Properties needed to create a user role
   * @return {Promise<{role: *}>}
   */
  static async eraseEvents() {
     await Event.destroy({
      where: {}
    })

    return null;
  }
}

// exports class as a module
module.exports = Events;
