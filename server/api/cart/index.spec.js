'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var cartCtrlStub = {
  index: 'cartCtrl.index',
  show: 'cartCtrl.show',
  create: 'cartCtrl.create',
  upsert: 'cartCtrl.upsert',
  patch: 'cartCtrl.patch',
  destroy: 'cartCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cartIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './cart.controller': cartCtrlStub
});

describe('Cart API Router:', function() {
  it('should return an express router instance', function() {
    cartIndex.should.equal(routerStub);
  });

  describe('GET /api/carts', function() {
    it('should route to thing.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cartCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/carts/:uid', function() {
    it('should route to cart.controller.show', function() {
      routerStub.get
        .withArgs('/:uid', 'cartCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/carts', function() {
    it('should route to cart.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cartCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/carts/:id', function() {
    it('should route to cart.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'cartCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/carts/:id', function() {
    it('should route to cart.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'cartCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/carts/:id', function() {
    it('should route to cart.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cartCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
