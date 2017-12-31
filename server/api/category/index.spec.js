'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var CategoryCtrlStub = {
  index: 'CategoryCtrl.index',
  show: 'CategoryCtrl.show',
  create: 'CategoryCtrl.create',
  upsert: 'CategoryCtrl.upsert',
  patch: 'CategoryCtrl.patch',
  destroy: 'CategoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var CategoryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './category.controller': CategoryCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    thingIndex.should.equal(routerStub);
  });

  describe('GET /api/categories', function() {
    it('should route to category.controller.index', function() {
      routerStub.get
        .withArgs('/', 'CategoryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/categories/:id', function() {
    it('should route to category.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'CategoryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/categories', function() {
    it('should route to category.controller.create', function() {
      routerStub.post
        .withArgs('/', 'CategoryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/categories/:id', function() {
    it('should route to category.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'CategoryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/categories/:id', function() {
    it('should route to thing.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'CategoryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/categories/:id', function() {
    it('should route to category.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'CategoryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
