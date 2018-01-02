'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var masterCtrlStub = {
  index: 'masterCtrl.index',
  show: 'masterCtrl.show',
  create: 'masterCtrl.create',
  upsert: 'masterCtrl.upsert',
  patch: 'masterCtrl.patch',
  destroy: 'masterCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var masterIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './master.controller': masterCtrlStub
});

describe('Master API Router:', function() {
  it('should return an express router instance', function() {
    masterIndex.should.equal(routerStub);
  });

  describe('GET /api/masters', function() {
    it('should route to master.controller.index', function() {
      routerStub.get
        .withArgs('/', 'masterCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/masters/:id', function() {
    it('should route to master.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'masterCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/masters', function() {
    it('should route to master.controller.create', function() {
      routerStub.post
        .withArgs('/', 'masterCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/masters/:id', function() {
    it('should route to master.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'masterCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/masters/:id', function() {
    it('should route to master.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'masterCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/masters/:id', function() {
    it('should route to master.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'masterCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
