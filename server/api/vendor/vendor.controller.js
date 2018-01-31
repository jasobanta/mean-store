/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Vendors              ->  index
 * POST    /api/Vendors              ->  create
 * GET     /api/Vendors/:id          ->  show
 * PUT     /api/Vendors/:id          ->  upsert
 * PATCH   /api/Vendors/:id          ->  patch
 * DELETE  /api/Vendors/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Vendor from './vendor.model';

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

// Gets a list of Vendors
export function index(req, res) {
  return Vendor.find()
  .populate({path: 'vtype', model: 'MasterAttr', match:{active: true } })
  .populate({path: 'marginmop', model: 'MasterAttr'})
  .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a list of Vendors
export function getbyname(req, res) {
  return Vendor.find({name: req.params.name}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vendor from the DB
export function show(req, res) {
  return Vendor.findById(req.params.id)
  .populate({path: 'vtype', model: 'MasterAttr'})
  .populate({path: 'doc1',  model: 'Upload'})
  .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vendor in the DB
export function create(req, res) {
  return Vendor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Vendor in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Vendor.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Vendor in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Vendor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Vendor from the DB
export function destroy(req, res) {
  return Vendor.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
