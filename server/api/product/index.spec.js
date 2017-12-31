'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var ProductCtrlStub = {
  index: 'ProductCtrl.index',
  show: 'ProductCtrl.show',
  create: 'ProductCtrl.create',
  upsert: 'ProductCtrl.upsert',
  patch: 'ProductCtrl.patch',
  destroy: 'ProductCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ProductIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './product.controller': ProductCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    ProductIndex.should.equal(routerStub);
  });

  describe('GET /api/products', function() {
    it('should route to product.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ProductCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/products/:id', function() {
    it('should route to product.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ProductCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/products', function() {
    it('should route to product.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ProductCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/products/:id', function() {
    it('should route to product.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'ProductCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/products/:id', function() {
    it('should route to product.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'ProductCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/products/:id', function() {
    it('should route to product.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ProductCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
