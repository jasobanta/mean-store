'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var vendorCtrlStub = {
  index: 'vendorCtrl.index',
  show: 'vendorCtrl.show',
  create: 'vendorCtrl.create',
  upsert: 'vendorCtrl.upsert',
  patch: 'vendorCtrl.patch',
  destroy: 'vendorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vendorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vendor.controller': vendorCtrlStub
});

describe('vendor API Router:', function() {
  it('should return an express router instance', function() {
    vendorIndex.should.equal(routerStub);
  });

  describe('GET /api/vendors', function() {
    it('should route to vendor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vendorCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/vendors/:id', function() {
    it('should route to vendor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vendorCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/vendors', function() {
    it('should route to vendor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vendorCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/vendors/:id', function() {
    it('should route to vendor.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'vendorCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vendors/:id', function() {
    it('should route to vendor.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'vendorCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vendors/:id', function() {
    it('should route to vendor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vendorCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
