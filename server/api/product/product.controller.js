/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  upsert
 * PATCH   /api/things/:id          ->  patch
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Product from './product.model';
var path = require('path');
var fs = require('fs');

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

function saveFile(res, file) {
//  console.log(file);
  var oldPath = 'client/assets/uploads/' + path.basename(file.path);
  var renametoPath = 'client/assets/uploads/' + path.basename(file.originalFilename);
  var newPath = '/assets/uploads/' + path.basename(file.originalFilename);

  fs.rename(oldPath, renametoPath, function(err){
    if (err) throw err;
      console.log('renamed complete');
  });
  return function(entity){
    entity.images.push(newPath);
    return entity.save();
  }
}
// Gets a list of products by categoy Id
export function getproductbycategory(req, res) {
  var catId = req.params.id;
  return Product.find({active: true, $or: [{maincats: {$eq: req.params.id}},
    {subcates: {$eq: req.params.id}},{itemcats: {$eq: req.params.id}},
    {itemsubcats: {$eq: req.params.id}}]})
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload'})
  .sort({itemgroupcode:1})
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a list of products by catid and brand id
export function getrelatedproducts(req, res) {
  var catId = req.params.catid;
  var brandId = req.params.brandid;
  return Product.find({active: true, $or: [{maincats: {$eq: catId}},
    {subcates: {$eq: catId}},{itemcats: {$eq: catId}},
    {itemsubcats: {$eq: catId}}], $and:[{brands:{$eq:brandId}}]})
  .populate({path: 'size',   model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color',  model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload'})
  .populate({path: 'maincats', model: 'Category'})
  .populate({path: 'subcates', model: 'Category'})
  .sort({itemgroupcode:1})
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a list of popular products by popid and brand id
export function getpopularproducts(req, res) {
  var catId = req.params.popid;
  var brandId = req.params.brandid;
  return Product.find({active: true, $or: [{maincats: {$eq: catId}},
    {subcates: {$eq: catId}},{itemcats: {$eq: catId}}], $and:[{brands:{$eq:brandId}}]})
  .populate({path: 'size',   model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color',  model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload'})
  .populate({path: 'maincats', model: 'Category'})
  .populate({path: 'subcates', model: 'Category'})
  .sort({itemgroupcode:1})
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}


// Gets a list of Things
export function index(req, res) {
  return Product.find({active: true})
  .populate({path: 'size',   model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color',  model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload'})
  .sort({itemgroupcode:1})
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

export function adminindex(req, res) {
  return Product.find()
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload'})
  .sort({itemgroupcode:1})
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a product by productsurl
export function byurl(req, res) {
  return Product.findOne({productsurl: req.params.purl}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
export function show(req, res) {
  return Product.findById(req.params.id)
  .populate({path: 'maincats', model: 'Category'})
  .populate({path: 'subcates', model: 'Category'})
  .populate({path: 'itemcats', model: 'Category', populate: { path: 'sizechart', model: 'Upload'}})
  .populate({path: 'itemsubcats', model: 'Category'})
  .populate({path: 'typecats', model: 'Category'})
  .populate({path: 'size', model: 'MasterAttr'})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'material', model: 'MasterAttr'})
  .populate({path: 'dimension', model: 'MasterAttr'})
  .populate({path: 'mop', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'vendors', model: 'Vendor'})
  .populate({path: 'images', model: 'Upload'})
  .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
export function showagre(req, res) {
  return Product.find({itemgroupcode:req.params.itemgroupcode},{size: 1, color:1, images:1 })
  .populate({path: 'size', model: 'MasterAttr', select: 'name', options:{ sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr', select: 'name'})
  .populate({path: 'images', model: 'Upload', select: 'logs',options:{sort:{_id:-1}}})
  .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Uploads a new Product's image in the DB
export function upload (req, res) {
  var file = req.files.file;
  if(!file){
    return handleError(res)('File not provided');
  }

  Product.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
