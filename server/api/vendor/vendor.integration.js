'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newVendor;

describe('Vendor API:', function() {
  describe('GET /api/vendors', function() {
    var vendors;

    beforeEach(function(done) {
      request(app)
        .get('/api/vendors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vendors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vendors.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/vendors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vendors')
        .send({
          name: 'New Vendor',
          info: 'This is the brand New Vendor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVendor = res.body;
          done();
        });
    });

    it('should respond with the newly created vendor', function() {
      newVendor.name.should.equal('New Vendor');
      newVendor.info.should.equal('This is the brand New Vendor!!!');
    });
  });

  describe('GET /api/vendors/:id', function() {
    var vendor;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vendors/${newVendor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vendor = res.body;
          done();
        });
    });

    afterEach(function() {
      vendor = {};
    });

    it('should respond with the requested vendor', function() {
      vendor.name.should.equal('New Vendor');
      vendor.info.should.equal('This is the brand New Vendor!!!');
    });
  });

  describe('PUT /api/vendors/:id', function() {
    var updatedvendor;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vendors/${newVendor._id}`)
        .send({
          name: 'Updated vendor',
          info: 'This is the updated vendor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedvendor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedvendor = {};
    });

    it('should respond with the updated vendor', function() {
      updatedvendor.name.should.equal('Updated vendor');
      updatedvendor.info.should.equal('This is the updated vendor!!!');
    });

    it('should respond with the updated vendor on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vendors/${newVendor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vendor = res.body;

          vendor.name.should.equal('Updated vendor');
          vendor.info.should.equal('This is the updated vendor!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vendors/:id', function() {
    var patchedvendor;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vendors/${newVendor._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched vendor' },
          { op: 'replace', path: '/info', value: 'This is the patched vendor!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedvendor = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedvendor = {};
    });

    it('should respond with the patched vendor', function() {
      patchedvendor.name.should.equal('Patched vendor');
      patchedvendor.info.should.equal('This is the patched vendor!!!');
    });
  });

  describe('DELETE /api/vendors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vendors/${newVendor._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vendor does not exist', function(done) {
      request(app)
        .delete(`/api/vendors/${newVendor._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
