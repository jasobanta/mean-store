'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCategory;

describe('Product API:', function() {
  describe('GET /api/products', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      things.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send({
          name: 'New products',
          info: 'This is the brand new Category!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newProduct = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      newProduct.name.should.equal('New Category');
      newProduct.info.should.equal('This is the brand new Category!!!');
    });
  });

  describe('GET /api/products/:id', function() {
    var product;

    beforeEach(function(done) {
      request(app)
        .get(`/api/products/${newProduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          product = res.body;
          done();
        });
    });

    afterEach(function() {
      category = {};
    });

    it('should respond with the requested thing', function() {
      product.name.should.equal('New Product');
      product.info.should.equal('This is the brand new Category!!!');
    });
  });

  describe('PUT /api/products/:id', function() {
    var updatedProduct;

    beforeEach(function(done) {
      request(app)
        .put(`/api/products/${newProduct._id}`)
        .send({
          name: 'Updated Product',
          info: 'This is the updated Category!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedProduct = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProduct = {};
    });

    it('should respond with the updated thing', function() {
      updatedProduct.name.should.equal('Updated Product');
      updatedProduct.info.should.equal('This is the updated Category!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/products/${newProduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let product = res.body;

          product.name.should.equal('Updated Product');
          product.info.should.equal('This is the updated Category!!!');

          done();
        });
    });
  });

  describe('PATCH /api/things/:id', function() {
    var patchedProducts;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/products/${newProduct._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Product' },
          { op: 'replace', path: '/info', value: 'This is the patched Category!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedProducts = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedProducts = {};
    });

    it('should respond with the patched thing', function() {
      patchedProducts.name.should.equal('Patched Category');
      patchedProducts.info.should.equal('This is the patched Category!!!');
    });
  });

  describe('DELETE /api/products/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/products/${newProduct._id}`)
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
        .delete(`/api/products/${newProduct._id}`)
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
