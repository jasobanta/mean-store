'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var jobprocessCtrlStub = {
  index: 'jobprocessCtrl.index',
  show: 'jobprocessCtrl.show',
  create: 'jobprocessCtrl.create',
  upsert: 'jobprocessCtrl.upsert',
  patch: 'jobprocessCtrl.patch',
  destroy: 'jobprocessCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jobprocessIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './jobprocess.controller': jobprocessCtrlStub
});

describe('Jobprocess API Router:', function() {
  it('should return an express router instance', function() {
    jobprocessIndex.should.equal(routerStub);
  });

  describe('GET /jobprocess', function() {
    it('should route to jobprocess.controller.index', function() {
      routerStub.get
        .withArgs('/', 'jobprocessCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /jobprocess/:id', function() {
    it('should route to jobprocess.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'jobprocessCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /jobprocess', function() {
    it('should route to jobprocess.controller.create', function() {
      routerStub.post
        .withArgs('/', 'jobprocessCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /jobprocess/:id', function() {
    it('should route to jobprocess.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'jobprocessCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /jobprocess/:id', function() {
    it('should route to jobprocess.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'jobprocessCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /jobprocess/:id', function() {
    it('should route to jobprocess.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'jobprocessCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
