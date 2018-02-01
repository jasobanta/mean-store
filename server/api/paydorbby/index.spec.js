'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var paydorbbyCtrlStub = {
  index: 'paydorbbyCtrl.index',
  show: 'paydorbbyCtrl.show',
  create: 'paydorbbyCtrl.create',
  upsert: 'paydorbbyCtrl.upsert',
  patch: 'paydorbbyCtrl.patch',
  destroy: 'paydorbbyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paydorbbyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './paydorbby.controller': paydorbbyCtrlStub
});

describe('Paydorbby API Router:', function() {
  it('should return an express router instance', function() {
    paydorbbyIndex.should.equal(routerStub);
  });

  describe('GET /api/paydorbbys', function() {
    it('should route to paydorbby.controller.index', function() {
      routerStub.get
        .withArgs('/', 'paydorbbyCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/paydorbbys/:id', function() {
    it('should route to paydorbby.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'paydorbbyCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/paydorbbys', function() {
    it('should route to paydorbby.controller.create', function() {
      routerStub.post
        .withArgs('/', 'paydorbbyCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/paydorbbys/:id', function() {
    it('should route to paydorbby.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'paydorbbyCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/paydorbbys/:id', function() {
    it('should route to paydorbby.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'paydorbbyCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/paydorbbys/:id', function() {
    it('should route to paydorbby.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'paydorbbyCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
