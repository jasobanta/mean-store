'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var orderdetailCtrlStub = {
  index: 'orderdetailCtrl.index',
  show: 'orderdetailCtrl.show',
  create: 'orderdetailCtrl.create',
  upsert: 'orderdetailCtrl.upsert',
  patch: 'orderdetailCtrl.patch',
  destroy: 'orderdetailCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var orderdetailIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './orderdetail.controller': orderdetailCtrlStub
});

describe('Orderdetail API Router:', function() {
  it('should return an express router instance', function() {
    orderdetailIndex.should.equal(routerStub);
  });

  describe('GET /api/orderdetails', function() {
    it('should route to orderdetail.controller.index', function() {
      routerStub.get
        .withArgs('/', 'orderdetailCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/orderdetails/:id', function() {
    it('should route to orderdetail.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'orderdetailCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/orderdetails', function() {
    it('should route to orderdetail.controller.create', function() {
      routerStub.post
        .withArgs('/', 'orderdetailCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/orderdetails/:id', function() {
    it('should route to orderdetail.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'orderdetailCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/orderdetails/:id', function() {
    it('should route to orderdetail.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'orderdetailCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/orderdetails/:id', function() {
    it('should route to orderdetail.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'orderdetailCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
