'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEnquiry;

describe('Enquiry API:', function() {
  describe('GET /api/enquirys', function() {
    var enquirys;

    beforeEach(function(done) {
      request(app)
        .get('/api/enquirys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          enquirys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      enquirys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/enquirys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/enquirys')
        .send({
          name: 'New Enquiry',
          info: 'This is the brand new enquiry!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEnquiry = res.body;
          done();
        });
    });

    it('should respond with the newly created enquiry', function() {
      newEnquiry.name.should.equal('New Enquiry');
      newEnquiry.info.should.equal('This is the brand new enquiry!!!');
    });
  });

  describe('GET /api/enquirys/:id', function() {
    var enquiry;

    beforeEach(function(done) {
      request(app)
        .get(`/api/enquirys/${newEnquiry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          enquiry = res.body;
          done();
        });
    });

    afterEach(function() {
      enquiry = {};
    });

    it('should respond with the requested enquiry', function() {
      enquiry.name.should.equal('New Enquiry');
      enquiry.info.should.equal('This is the brand new enquiry!!!');
    });
  });

  describe('PUT /api/enquirys/:id', function() {
    var updatedEnquiry;

    beforeEach(function(done) {
      request(app)
        .put(`/api/enquirys/${newEnquiry._id}`)
        .send({
          name: 'Updated Enquiry',
          info: 'This is the updated enquiry!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEnquiry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEnquiry = {};
    });

    it('should respond with the updated enquiry', function() {
      updatedEnquiry.name.should.equal('Updated Enquiry');
      updatedEnquiry.info.should.equal('This is the updated enquiry!!!');
    });

    it('should respond with the updated enquiry on a subsequent GET', function(done) {
      request(app)
        .get(`/api/enquirys/${newEnquiry._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let enquiry = res.body;

          enquiry.name.should.equal('Updated Enquiry');
          enquiry.info.should.equal('This is the updated enquiry!!!');

          done();
        });
    });
  });

  describe('PATCH /api/enquirys/:id', function() {
    var patchedEnquiry;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/enquirys/${newEnquiry._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Enquiry' },
          { op: 'replace', path: '/info', value: 'This is the patched enquiry!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEnquiry = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEnquiry = {};
    });

    it('should respond with the patched enquiry', function() {
      patchedEnquiry.name.should.equal('Patched Enquiry');
      patchedEnquiry.info.should.equal('This is the patched enquiry!!!');
    });
  });

  describe('DELETE /api/enquirys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/enquirys/${newEnquiry._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when enquiry does not exist', function(done) {
      request(app)
        .delete(`/api/enquirys/${newEnquiry._id}`)
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
