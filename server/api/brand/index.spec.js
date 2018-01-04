'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var brandCtrlStub = {
  index: 'brandCtrl.index',
  show: 'brandCtrl.show',
  create: 'brandCtrl.create',
  upsert: 'brandCtrl.upsert',
  patch: 'brandCtrl.patch',
  destroy: 'brandCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var brandIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './brand.controller': brandCtrlStub
});

describe('Brand API Router:', function() {
  it('should return an express router instance', function() {
    brandIndex.should.equal(routerStub);
  });

  describe('GET /api/brands', function() {
    it('should route to brand.controller.index', function() {
      routerStub.get
        .withArgs('/', 'brandCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/brands/:id', function() {
    it('should route to brand.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'brandCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/brands', function() {
    it('should route to brand.controller.create', function() {
      routerStub.post
        .withArgs('/', 'brandCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/brands/:id', function() {
    it('should route to brand.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'brandCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/brands/:id', function() {
    it('should route to brand.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'brandCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/brands/:id', function() {
    it('should route to brand.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'brandCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
