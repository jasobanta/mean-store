'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var enquiryCtrlStub = {
  index: 'enquiryCtrl.index',
  show: 'enquiryCtrl.show',
  create: 'enquiryCtrl.create',
  upsert: 'enquiryCtrl.upsert',
  patch: 'enquiryCtrl.patch',
  destroy: 'enquiryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var enquiryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './enquiry.controller': enquiryCtrlStub
});

describe('Enquiry API Router:', function() {
  it('should return an express router instance', function() {
    enquiryIndex.should.equal(routerStub);
  });

  describe('GET /api/enquirys', function() {
    it('should route to enquiry.controller.index', function() {
      routerStub.get
        .withArgs('/', 'enquiryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/enquirys/:id', function() {
    it('should route to enquiry.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'enquiryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/enquirys', function() {
    it('should route to enquiry.controller.create', function() {
      routerStub.post
        .withArgs('/', 'enquiryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/enquirys/:id', function() {
    it('should route to enquiry.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'enquiryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/enquirys/:id', function() {
    it('should route to enquiry.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'enquiryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/enquirys/:id', function() {
    it('should route to enquiry.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'enquiryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
