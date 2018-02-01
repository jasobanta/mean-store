'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPaydorbby;

describe('Paydorbby API:', function() {
  describe('GET /api/paydorbbys', function() {
    var paydorbbys;

    beforeEach(function(done) {
      request(app)
        .get('/api/paydorbbys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          paydorbbys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      paydorbbys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/paydorbbys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/paydorbbys')
        .send({
          name: 'New Paydorbby',
          info: 'This is the brand new paydorbby!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPaydorbby = res.body;
          done();
        });
    });

    it('should respond with the newly created paydorbby', function() {
      newPaydorbby.name.should.equal('New Paydorbby');
      newPaydorbby.info.should.equal('This is the brand new paydorbby!!!');
    });
  });

  describe('GET /api/paydorbbys/:id', function() {
    var paydorbby;

    beforeEach(function(done) {
      request(app)
        .get(`/api/paydorbbys/${newPaydorbby._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          paydorbby = res.body;
          done();
        });
    });

    afterEach(function() {
      paydorbby = {};
    });

    it('should respond with the requested paydorbby', function() {
      paydorbby.name.should.equal('New Paydorbby');
      paydorbby.info.should.equal('This is the brand new paydorbby!!!');
    });
  });

  describe('PUT /api/paydorbbys/:id', function() {
    var updatedPaydorbby;

    beforeEach(function(done) {
      request(app)
        .put(`/api/paydorbbys/${newPaydorbby._id}`)
        .send({
          name: 'Updated Paydorbby',
          info: 'This is the updated paydorbby!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPaydorbby = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaydorbby = {};
    });

    it('should respond with the updated paydorbby', function() {
      updatedPaydorbby.name.should.equal('Updated Paydorbby');
      updatedPaydorbby.info.should.equal('This is the updated paydorbby!!!');
    });

    it('should respond with the updated paydorbby on a subsequent GET', function(done) {
      request(app)
        .get(`/api/paydorbbys/${newPaydorbby._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let paydorbby = res.body;

          paydorbby.name.should.equal('Updated Paydorbby');
          paydorbby.info.should.equal('This is the updated paydorbby!!!');

          done();
        });
    });
  });

  describe('PATCH /api/paydorbbys/:id', function() {
    var patchedPaydorbby;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/paydorbbys/${newPaydorbby._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Paydorbby' },
          { op: 'replace', path: '/info', value: 'This is the patched paydorbby!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPaydorbby = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPaydorbby = {};
    });

    it('should respond with the patched paydorbby', function() {
      patchedPaydorbby.name.should.equal('Patched Paydorbby');
      patchedPaydorbby.info.should.equal('This is the patched paydorbby!!!');
    });
  });

  describe('DELETE /api/paydorbbys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/paydorbbys/${newPaydorbby._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paydorbby does not exist', function(done) {
      request(app)
        .delete(`/api/paydorbbys/${newPaydorbby._id}`)
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
