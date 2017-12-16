'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCategory;

describe('Category API:', function() {
  describe('GET /api/categories', function() {
    var categories;

    beforeEach(function(done) {
      request(app)
        .get('/api/categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          categories = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      things.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/categories', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/categories')
        .send({
          name: 'New Category',
          info: 'This is the brand new Category!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCategory = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      newCategory.name.should.equal('New Category');
      newCategory.info.should.equal('This is the brand new Category!!!');
    });
  });

  describe('GET /api/categories/:id', function() {
    var category;

    beforeEach(function(done) {
      request(app)
        .get(`/api/categories/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          category = res.body;
          done();
        });
    });

    afterEach(function() {
      category = {};
    });

    it('should respond with the requested thing', function() {
      category.name.should.equal('New Category');
      category.info.should.equal('This is the brand new Category!!!');
    });
  });

  describe('PUT /api/categories/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/categories/${newThing._id}`)
        .send({
          name: 'Updated Category',
          info: 'This is the updated Category!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated thing', function() {
      updatedThing.name.should.equal('Updated Category');
      updatedThing.info.should.equal('This is the updated Category!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/categories/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          thing.name.should.equal('Updated Category');
          thing.info.should.equal('This is the updated Category!!!');

          done();
        });
    });
  });

  describe('PATCH /api/things/:id', function() {
    var patchedThing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/categories/${newThing._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Category' },
          { op: 'replace', path: '/info', value: 'This is the patched Category!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThing = {};
    });

    it('should respond with the patched thing', function() {
      patchedThing.name.should.equal('Patched Category');
      patchedThing.info.should.equal('This is the patched Category!!!');
    });
  });

  describe('DELETE /api/categories/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/categories/${newThing._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete(`/api/categories/${newThing._id}`)
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
