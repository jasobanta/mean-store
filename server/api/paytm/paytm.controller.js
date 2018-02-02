/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/paytms              ->  index
 * POST    /api/paytms              ->  create
 * GET     /api/paytms/:id          ->  show
 * PUT     /api/paytms/:id          ->  upsert
 * PATCH   /api/paytms/:id          ->  patch
 * DELETE  /api/paytms/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import crypt from './crypt';
import paytmchecksum from './checksum';
import config from '../../config/environment';

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

// generate checksum for paytm use
export function generateChecksum(req, res) {
  var paytmparams = {};
  paytmparams['MID'] = config.paytm.MID;
  paytmparams['ORDER_ID'] = req.body._id;
  paytmparams['CUST_ID'] = req.body.userid._id;
  paytmparams['INDUSTRY_TYPE_ID'] = config.paytm.INDUSTRY_TYPE_ID;
  paytmparams['CHANNEL_ID'] = config.paytm.CHANNEL_ID;
  paytmparams['TXN_AMOUNT'] = req.body.payable;
  paytmparams['WEBSITE'] = config.paytm.WEBSITE;
  paytmparams['CALLBACK_URL'] = config.paytm.CALLBACK_URL;
  paytmparams['EMAIL'] = req.body.userid.email;
  paytmparams['MOBILE_NO'] = '7777777777';
  
  return paytmchecksum.genchecksum(paytmparams, config.paytm.MERCHANT_KEY)
  .then(respondWithResult(res))
  .catch(handleError(res));
}