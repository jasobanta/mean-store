'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMasterAttr;

describe('MasterAttr API:', function() {
  describe('GET /api/masterattrs', function() {
    var masterattrs;

    beforeEach(function(done) {
      request(app)
        .get('/api/masterattrs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          masterattrs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      masterattrs.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/masterattrs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/masterattrs')
        .send({
          name: 'New MasterAttr',
          info: 'This is the brand new master!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMasterAttr = res.body;
          done();
        });
    });

    it('should respond with the newly created master', function() {
      newMasterAttr.name.should.equal('New MasterAttr');
      newMasterAttr.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('GET /api/masterattrs/:id', function() {
    var master;

    beforeEach(function(done) {
      request(app)
        .get(`/api/masterattrs/${newMasterAttr._id}`)
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
      master.name.should.equal('New MasterAttr');
      master.info.should.equal('This is the brand new master!!!');
    });
  });

  describe('PUT /api/masterattrs/:id', function() {
    var updatedMasterAttr;

    beforeEach(function(done) {
      request(app)
        .put(`/api/masterattrs/${newMasterAttr._id}`)
        .send({
          name: 'Updated MasterAttr',
          info: 'This is the updated master!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMasterAttr = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMasterAttr = {};
    });

    it('should respond with the updated master', function() {
      updatedMasterAttr.name.should.equal('Updated MasterAttr');
      updatedMasterAttr.info.should.equal('This is the updated master!!!');
    });

    it('should respond with the updated master on a subsequent GET', function(done) {
      request(app)
        .get(`/api/masterattrs/${newMasterAttr._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let master = res.body;

          master.name.should.equal('Updated MasterAttr');
          master.info.should.equal('This is the updated master!!!');

          done();
        });
    });
  });

  describe('PATCH /api/masterattrs/:id', function() {
    var patchedMasterAttr;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/masterattrs/${newMasterAttr._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched MasterAttr' },
          { op: 'replace', path: '/info', value: 'This is the patched master!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMasterAttr = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMasterAttr = {};
    });

    it('should respond with the patched master', function() {
      patchedMasterAttr.name.should.equal('Patched MasterAttr');
      patchedMasterAttr.info.should.equal('This is the patched master!!!');
    });
  });

  describe('DELETE /api/masterattrs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/masterattrs/${newMasterAttr._id}`)
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
        .delete(`/api/masterattrs/${newMasterAttr._id}`)
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
