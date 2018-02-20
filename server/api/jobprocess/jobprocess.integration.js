'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newJobprocess;

describe('Jobprocess API:', function() {
  describe('GET /jobprocess', function() {
    var jobprocesss;

    beforeEach(function(done) {
      request(app)
        .get('/jobprocess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobprocesss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      jobprocesss.should.be.instanceOf(Array);
    });
  });

  describe('POST /jobprocess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/jobprocess')
        .send({
          name: 'New Jobprocess',
          info: 'This is the brand new jobprocess!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJobprocess = res.body;
          done();
        });
    });

    it('should respond with the newly created jobprocess', function() {
      newJobprocess.name.should.equal('New Jobprocess');
      newJobprocess.info.should.equal('This is the brand new jobprocess!!!');
    });
  });

  describe('GET /jobprocess/:id', function() {
    var jobprocess;

    beforeEach(function(done) {
      request(app)
        .get(`/jobprocess/${newJobprocess._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobprocess = res.body;
          done();
        });
    });

    afterEach(function() {
      jobprocess = {};
    });

    it('should respond with the requested jobprocess', function() {
      jobprocess.name.should.equal('New Jobprocess');
      jobprocess.info.should.equal('This is the brand new jobprocess!!!');
    });
  });

  describe('PUT /jobprocess/:id', function() {
    var updatedJobprocess;

    beforeEach(function(done) {
      request(app)
        .put(`/jobprocess/${newJobprocess._id}`)
        .send({
          name: 'Updated Jobprocess',
          info: 'This is the updated jobprocess!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJobprocess = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJobprocess = {};
    });

    it('should respond with the updated jobprocess', function() {
      updatedJobprocess.name.should.equal('Updated Jobprocess');
      updatedJobprocess.info.should.equal('This is the updated jobprocess!!!');
    });

    it('should respond with the updated jobprocess on a subsequent GET', function(done) {
      request(app)
        .get(`/jobprocess/${newJobprocess._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let jobprocess = res.body;

          jobprocess.name.should.equal('Updated Jobprocess');
          jobprocess.info.should.equal('This is the updated jobprocess!!!');

          done();
        });
    });
  });

  describe('PATCH /jobprocess/:id', function() {
    var patchedJobprocess;

    beforeEach(function(done) {
      request(app)
        .patch(`/jobprocess/${newJobprocess._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Jobprocess' },
          { op: 'replace', path: '/info', value: 'This is the patched jobprocess!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJobprocess = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJobprocess = {};
    });

    it('should respond with the patched jobprocess', function() {
      patchedJobprocess.name.should.equal('Patched Jobprocess');
      patchedJobprocess.info.should.equal('This is the patched jobprocess!!!');
    });
  });

  describe('DELETE /jobprocess/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/jobprocess/${newJobprocess._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jobprocess does not exist', function(done) {
      request(app)
        .delete(`/jobprocess/${newJobprocess._id}`)
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
