/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /jobprocess              ->  index
 * POST    /jobprocess              ->  create
 * GET     /jobprocess/:id          ->  show
 * PUT     /jobprocess/:id          ->  upsert
 * PATCH   /jobprocess/:id          ->  patch
 * DELETE  /jobprocess/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Jobprocess from './jobprocess.model';
import Product from '../product/product.model';
import Catetory from '../category/category.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Jobprocesss
export function index(req, res) {
  return Jobprocess.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Jobprocess from the DB
export function show(req, res) {
  return Jobprocess.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Jobprocess in the DB
export function create(req, res) {
  return Jobprocess.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Jobprocess in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Jobprocess.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Jobprocess in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Jobprocess.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Jobprocess from the DB
export function destroy(req, res) {
  return Jobprocess.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
export function process(req, res) {
  return Catetory.find().exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}
