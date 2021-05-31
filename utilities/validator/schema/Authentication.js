/* eslint-disable no-useless-escape */
/**
 * @file This file defines the validation schema for routes
 * for ehich the data repository in turn queries the data
 * @author Gabriel <gabrielsonchia@gmail.com> <29/05/2021 02:37am>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <31/05/2021 07:12pm>
 */

const Joi = require('joi');
const validator = require('../schemaValidation');

const payload = Object.freeze({
  QUERY: 'req.query',
  PARAMS: 'req.params',
  BODY: 'req.body',
});

/**
 * @class Authentication
 * @classdesc An authentication schema class responsible for routes validation
 */
class Authentication {
  /**
   * @description defines the validation schema for updating an actor
   * @returns {function(...[*]=)}
   */

  static updateActorSchema() {
    return (req, res, next) => {
      const bodySchema = Joi.object({
        actor: Joi.object({
          id: Joi.number().required().messages({
            'any.required': "Actor's id is required",
          }),
          avatar_url: Joi.string().trim().required().messages({
            'any.required': "Actor's avatar url is required",
          }),
        }),
      });
      validator(req, [bodySchema], [payload.BODY]);
      next();
    };
  }

  /**
   * @description defines the validation schema for filtering events by actor ID
   * @returns {function(...[*]=)}
   */

  static filterEventsSchema() {
    return (req, res, next) => {
      const paramSchema = Joi.object({
        actorID: Joi.number().required().messages({
          'any.required': "Actor's id is required",
        }),
      });
      validator(req, [paramSchema], [payload.PARAMS]);
      next();
    };
  }

  /**
   * @description defines the validation schema for creating an event
   * @returns {function(...[*]=)}
   */

  static createEventSchema() {
    return (req, res, next) => {
      const bodySchema = Joi.object({
        id: Joi.number().required().messages({
          'any.required': "Event's id is required",
        }),
        type: Joi.string().required().messages({
          'any.required': 'Event type is required',
        }),
        actor: Joi.object({
          id: Joi.number().required().messages({
            'any.required': "Actor's id is required",
          }),
          avatar_url: Joi.string().trim().required().messages({
            'any.required': "Actor's avatar url is required",
          }),
          login: Joi.string().trim().required().messages({
            'any.required': "Actor's login is required",
          }),
        }),
        repo: Joi.object({
          id: Joi.number().required().messages({
            'any.required': "Reop's id is required",
          }),
          url: Joi.string().trim().required().messages({
            'any.required': "Repo's url is required",
          }),
          name: Joi.string().trim().required().messages({
            'any.required': "Repo's name is required",
          }),
        }),
        created_at: Joi.string().required().messages({
          'any.required':
            "Date event was created is required - 'yyyy-MM-dd HH:mm:ss'",
        }),
      });
      validator(req, [bodySchema], [payload.BODY]);
      next();
    };
  }
}

// exports class as module
module.exports = Authentication;
