/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/uploads              ->  index
 * POST    /api/uploads              ->  create
 * GET     /api/uploads/:id          ->  show
 * PUT     /api/uploads/:id          ->  upsert
 * PATCH   /api/uploads/:id          ->  patch
 * DELETE  /api/uploads/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Upload from './upload.model';
import path from 'path';
import fs from 'fs-extra';
import gm from 'sharp';


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
function saveProductsImage(res, file, data){
  var timestamp = Date.now();
  var imagename = data.imagename +'-'+timestamp +  path.extname(file.originalFilename);
  var oldPath = file.path;
  var renametoPath = path.dirname(file.path) + path.sep +path.basename(imagename);
  var newPath = path.dirname(file.path) + path.sep + path.basename(imagename);
  var s_219 = path.dirname(file.path) + path.sep + 's_219_' + path.basename(imagename);
  var s_79 = path.dirname(file.path) + path.sep + 's_79_' + path.basename(imagename);
  var s_75 = path.dirname(file.path) + path.sep + 's_75_' + path.basename(imagename);

//  console.log('oldPath='+oldPath+'renametoPath='+renametoPath+'newPath='+newPath);

  fs.rename(oldPath, renametoPath, function(err){
    if (err) throw err;
    //  console.log('renamed complete');
      fs.copy(newPath, s_219, (err) => {
        if (err) throw err;
        console.log(newPath+' was copied to '+s_219);
        // gm(s_219).resize(219);
        gm(newPath)
        .resize(219,329)
        .toFile(s_219);
      });
      fs.copy(newPath, s_79, (err) => {
        if (err) throw err;
        console.log(newPath+' was copied to '+s_79);
        gm(newPath).resize(79,119).toFile(s_79);
      });
      fs.copy(newPath, s_75, (err) => {
        if (err) throw err;
      console.log(newPath+' was copied to '+s_75);
        gm(newPath).resize(75).toFile(s_75);
      });
  });
  return function(entity){
    console.log(entity);
    entity.logs = {};
    entity.logs.original = newPath.replace('client/', '');
    entity.logs.s_219 = s_219.replace('client/', '');
    entity.logs.s_79 = s_79.replace('client/', '');
    entity.logs.s_75 = s_75.replace('client/', '');
    console.log(entity);
    return entity.save();
  };
}
// Gets a list of Uploads
export function index(req, res) {
  return Upload.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Upload from the DB
export function show(req, res) {
  return Upload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Upload in the DB
export function create(req, res) {
  return Upload.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// upload images from products
export function productImage(req, res) {
  //console.log('hit at productImage');
  var file = req.files.file;
  if(!file){
    return handleError(res)('File not provided');
  }

  return Upload.create(req.body)
    .then(saveProductsImage(res, file, req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
// Upserts the given Upload in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Upload.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Upload in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Upload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Upload from the DB
export function destroy(req, res) {
  return Upload.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
