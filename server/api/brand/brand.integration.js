'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBrand;

describe('Brand API:', function() {
  describe('GET /api/brands', function() {
    var brands;

    beforeEach(function(done) {
      request(app)
        .get('/api/brands')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          brands = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      brands.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/brands', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/brands')
        .send({
          name: 'New Brand',
          info: 'This is the brand new master!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBrand = res.body;
          done();
        });
    });

    it('should respond with the newly created master', function() {
      newBrand.name.should.equal('New Brand');
      newBrand.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('GET /api/brands/:id', function() {
    var master;

    beforeEach(function(done) {
      request(app)
        .get(`/api/brands/${newBrand._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          master = res.body;
          done();
        });
    });

    afterEach(function() {
      master = {};
    });

    it('should respond with the requested master', function() {
      master.name.should.equal('New Brand');
      master.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('PUT /api/brands/:id', function() {
    var updatedBrand;

    beforeEach(function(done) {
      request(app)
        .put(`/api/brands/${newBrand._id}`)
        .send({
          name: 'Updated Brand',
          info: 'This is the updated master!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBrand = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBrand = {};
    });

    it('should respond with the updated master', function() {
      updatedBrand.name.should.equal('Updated Brand');
      updatedBrand.info.should.equal('This is the updated master!!!');
    });

    it('should respond with the updated master on a subsequent GET', function(done) {
      request(app)
        .get(`/api/brands/${newBrand._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let master = res.body;

          master.name.should.equal('Updated Brand');
          master.info.should.equal('This is the updated master!!!');

          done();
        });
    });
  });

  describe('PATCH /api/brands/:id', function() {
    var patchedBrand;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/brands/${newBrand._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Brand' },
          { op: 'replace', path: '/info', value: 'This is the patched master!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBrand = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBrand = {};
    });

    it('should respond with the patched master', function() {
      patchedBrand.name.should.equal('Patched Brand');
      patchedBrand.info.should.equal('This is the patched master!!!');
    });
  });

  describe('DELETE /api/brands/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/brands/${newBrand._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when master does not exist', function(done) {
      request(app)
        .delete(`/api/brands/${newBrand._id}`)
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
