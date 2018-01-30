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
import config from '../../config/environment';
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
function respondWithResultPaged(res, statusCode) {
  statusCode = statusCode || 200;
  var limit = config.itempPerPage || 40;
  return function(entity) {
    console.log(entity);
    var paged = {};
    if(entity) {
      paged.total= entity;
      paged.limit = limit;
      paged.pages = Math.ceil(entity/limit);
    //  console.log(paged);
      //entity.push({limit:limit})
      return res.status(statusCode).json(paged);
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
  var prdLimit= req.params.prdlimit||20;

  return Product.find({active: true, $or: [{maincats: {$eq: req.params.id}},
    {subcates: {$eq: req.params.id}},{itemcats: {$eq: req.params.id}},
    {itemsubcats: {$eq: req.params.id}}]})
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'material', model: 'MasterAttr'})
  .populate({path: 'images', model: 'Upload'})
  .sort({itemgroupcode:1})
//  .limit(prdLimit)
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}
// Gets a list of products by Category Id page white-space

export function getProductByCategoryPaged(req, res) {
  var catId = req.params.id;
  var page = req.params.page;
  var limit = config.itempPerPage||40;
  var skip = (page - 1) * limit;

  return Product.find({active: true, $or: [{maincats: {$eq: req.params.id}},
    {subcates: {$eq: req.params.id}},{itemcats: {$eq: req.params.id}},
    {itemsubcats: {$eq: req.params.id}}]})
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'material', model: 'MasterAttr'})
  .populate({path: 'images', model: 'Upload', options:{sort:{order:1}}})
  .sort({itemgroupcode:1})
//  .limit(prdLimit)
  .skip(skip).limit(limit)
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}
//pager helper in category product listing pager
export function getProductByCategoryPager(req, res) {
  var catId = req.params.id;
  return Product.count({active: true, $or: [{maincats: {$eq: req.params.id}},
    {subcates: {$eq: req.params.id}},{itemcats: {$eq: req.params.id}},
    {itemsubcats: {$eq: req.params.id}}]})
    .then(handleEntityNotFound(res))
    .then(respondWithResultPaged(res))
    .catch(handleError(res));
}
// Gets a list of products by catid and brand id
export function getrelatedproducts(req, res) {
  var catId = req.params.catid;
  var brandId = req.params.brandid;
  return Product.find({active: true, $or: [{maincats: {$eq: catId}},
    {subcates: {$eq: catId}},{itemcats: {$eq: catId}},
    {itemsubcats: {$eq: catId}}]})
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
  //var catId = req.params.popid;
  //var brandId = req.params.brandid;
  return Product.find({active: true})
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
  var limit = config.itempPerPage||40;
  var page = req.params.page;
  var skip = (page - 1) * limit;
  return Product.find()
  .skip(skip).limit(limit)
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload', options:{sort:{sort:1}}})
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
  return Product.find({itemgroupcode:req.params.itemgroupcode},{active: 1, inventory: 1, size: 1, color: 1, images: 1})
  .populate({path: 'size', model: 'MasterAttr', options:{ sort:{sort: 1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'images', model: 'Upload', select: 'logs',options:{sort:{_id: -1}}})
  // .sort({size:1})
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

// help information about paging details
export function paged(req, res) {
  Product.count()
  .then(handleEntityNotFound(res))
  .then(respondWithResultPaged(res))
  .catch(handleError(res));
}
// get all Itemcodes
export function getItemcodes(req, res) {
  Product.distinct('itemcode')
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}
// get all Itemcodes
export function getItemcodesBygroupId(req, res) {
  Product.where({itemgroupcode: req.params.groupcode}).distinct('itemcode')
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// get all Itemgroupcodes
export function getItemgroupcodes(req, res) {
  Product.distinct('itemgroupcode')
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// search on groupcode and itemcode {both are required}
export function search(req, res) {
  Product.find({itemgroupcode: req.params.itemgroupcode, itemcode: req.params.itemcode})
  .populate({path: 'size', model: 'MasterAttr',options:{sort:{sort:1}}})
  .populate({path: 'color', model: 'MasterAttr'})
  .populate({path: 'brands', model: 'Brand'})
  .populate({path: 'images', model: 'Upload', options:{sort:{sort:1}}})
  .sort({itemgroupcode:1})
  .exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}
