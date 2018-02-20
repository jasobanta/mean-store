'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMaster;

describe('Master API:', function() {
  describe('GET /api/masters', function() {
    var masters;

    beforeEach(function(done) {
      request(app)
        .get('/api/masters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          masters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      masters.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/masters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/masters')
        .send({
          name: 'New Master',
          info: 'This is the brand new master!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMaster = res.body;
          done();
        });
    });

    it('should respond with the newly created master', function() {
      newMaster.name.should.equal('New Master');
      newMaster.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('GET /api/masters/:id', function() {
    var master;

    beforeEach(function(done) {
      request(app)
        .get(`/api/masters/${newMaster._id}`)
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
      master.name.should.equal('New Master');
      master.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('PUT /api/masters/:id', function() {
    var updatedMaster;

    beforeEach(function(done) {
      request(app)
        .put(`/api/masters/${newMaster._id}`)
        .send({
          name: 'Updated Master',
          info: 'This is the updated master!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMaster = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMaster = {};
    });

    it('should respond with the updated master', function() {
      updatedMaster.name.should.equal('Updated Master');
      updatedMaster.info.should.equal('This is the updated master!!!');
    });

    it('should respond with the updated master on a subsequent GET', function(done) {
      request(app)
        .get(`/api/masters/${newMaster._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let master = res.body;

          master.name.should.equal('Updated Master');
          master.info.should.equal('This is the updated master!!!');

          done();
        });
    });
  });

  describe('PATCH /api/masters/:id', function() {
    var patchedMaster;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/masters/${newMaster._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Master' },
          { op: 'replace', path: '/info', value: 'This is the patched master!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMaster = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMaster = {};
    });

    it('should respond with the patched master', function() {
      patchedMaster.name.should.equal('Patched Master');
      patchedMaster.info.should.equal('This is the patched master!!!');
    });
  });

  describe('DELETE /api/masters/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/masters/${newMaster._id}`)
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
        .delete(`/api/masters/${newMaster._id}`)
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
