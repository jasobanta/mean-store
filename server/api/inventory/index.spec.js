'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var inventoryCtrlStub = {
  index: 'inventoryCtrl.index',
  show: 'inventoryCtrl.show',
  create: 'inventoryCtrl.create',
  upsert: 'inventoryCtrl.upsert',
  patch: 'inventoryCtrl.patch',
  destroy: 'inventoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inventoryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './inventory.controller': inventoryCtrlStub
});

describe('Inventory API Router:', function() {
  it('should return an express router instance', function() {
    inventoryIndex.should.equal(routerStub);
  });

  describe('GET /api/inventorys', function() {
    it('should route to inventory.controller.index', function() {
      routerStub.get
        .withArgs('/', 'inventoryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/inventorys/:id', function() {
    it('should route to inventory.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'inventoryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/inventorys', function() {
    it('should route to inventory.controller.create', function() {
      routerStub.post
        .withArgs('/', 'inventoryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/inventorys/:id', function() {
    it('should route to inventory.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'inventoryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/inventorys/:id', function() {
    it('should route to inventory.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'inventoryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/inventorys/:id', function() {
    it('should route to inventory.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'inventoryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
