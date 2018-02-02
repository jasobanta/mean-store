/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orderdetails              ->  index
 * POST    /api/orderdetails              ->  create
 * GET     /api/orderdetails/:id          ->  show
 * PUT     /api/orderdetails/:id          ->  upsert
 * PATCH   /api/orderdetails/:id          ->  patch
 * DELETE  /api/orderdetails/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Orderdetail from './orderdetail.model';

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

// Gets a list of Orderdetails
export function index(req, res) {
  return Orderdetail.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Orderdetail from the DB
export function show(req, res) {
  return Orderdetail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Orderdetail in the DB
export function create(req, res) {
  return Orderdetail.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Orderdetail in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Orderdetail.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Orderdetail in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Orderdetail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Orderdetail from the DB
export function destroy(req, res) {
  return Orderdetail.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
