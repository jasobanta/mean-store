'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var masterattrCtrlStub = {
  index: 'masterattrCtrl.index',
  show: 'masterattrCtrl.show',
  create: 'masterattrCtrl.create',
  upsert: 'masterattrCtrl.upsert',
  patch: 'masterattrCtrl.patch',
  destroy: 'masterattrCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var masterattrIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './masterattr.controller': masterattrCtrlStub
});

describe('MasterAttr API Router:', function() {
  it('should return an express router instance', function() {
    masterattrIndex.should.equal(routerStub);
  });

  describe('GET /api/masterattrs', function() {
    it('should route to masterattr.controller.index', function() {
      routerStub.get
        .withArgs('/', 'masterattrCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/masterattrs/:id', function() {
    it('should route to masterattr.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'masterattrCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/masterattrs', function() {
    it('should route to masterattr.controller.create', function() {
      routerStub.post
        .withArgs('/', 'masterattrCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/masterattrs/:id', function() {
    it('should route to masterattr.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'masterattrCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/masterattrs/:id', function() {
    it('should route to masterattr.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'masterattrCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/masterattrs/:id', function() {
    it('should route to masterattr.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'masterattrCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
