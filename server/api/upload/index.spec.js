'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var uploadCtrlStub = {
  index: 'uploadCtrl.index',
  show: 'uploadCtrl.show',
  create: 'uploadCtrl.create',
  upsert: 'uploadCtrl.upsert',
  patch: 'uploadCtrl.patch',
  destroy: 'uploadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var uploadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './upload.controller': uploadCtrlStub
});

describe('Upload API Router:', function() {
  it('should return an express router instance', function() {
    uploadIndex.should.equal(routerStub);
  });

  describe('GET /api/uploads', function() {
    it('should route to upload.controller.index', function() {
      routerStub.get
        .withArgs('/', 'uploadCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/uploads/:id', function() {
    it('should route to upload.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'uploadCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/uploads', function() {
    it('should route to upload.controller.create', function() {
      routerStub.post
        .withArgs('/', 'uploadCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/uploads/:id', function() {
    it('should route to upload.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'uploadCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/uploads/:id', function() {
    it('should route to upload.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'uploadCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/uploads/:id', function() {
    it('should route to upload.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'uploadCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
