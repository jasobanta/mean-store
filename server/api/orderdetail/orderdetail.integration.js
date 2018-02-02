'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newOrderdetail;

describe('Orderdetail API:', function() {
  describe('GET /api/orderdetails', function() {
    var orderdetails;

    beforeEach(function(done) {
      request(app)
        .get('/api/orderdetails')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          orderdetails = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orderdetails.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/orderdetails', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/orderdetails')
        .send({
          name: 'New Orderdetail',
          info: 'This is the brand new orderdetail!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newOrderdetail = res.body;
          done();
        });
    });

    it('should respond with the newly created orderdetail', function() {
      newOrderdetail.name.should.equal('New Orderdetail');
      newOrderdetail.info.should.equal('This is the brand new orderdetail!!!');
    });
  });

  describe('GET /api/orderdetails/:id', function() {
    var orderdetail;

    beforeEach(function(done) {
      request(app)
        .get(`/api/orderdetails/${newOrderdetail._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          orderdetail = res.body;
          done();
        });
    });

    afterEach(function() {
      orderdetail = {};
    });

    it('should respond with the requested orderdetail', function() {
      orderdetail.name.should.equal('New Orderdetail');
      orderdetail.info.should.equal('This is the brand new orderdetail!!!');
    });
  });

  describe('PUT /api/orderdetails/:id', function() {
    var updatedOrderdetail;

    beforeEach(function(done) {
      request(app)
        .put(`/api/orderdetails/${newOrderdetail._id}`)
        .send({
          name: 'Updated Orderdetail',
          info: 'This is the updated orderdetail!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedOrderdetail = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOrderdetail = {};
    });

    it('should respond with the updated orderdetail', function() {
      updatedOrderdetail.name.should.equal('Updated Orderdetail');
      updatedOrderdetail.info.should.equal('This is the updated orderdetail!!!');
    });

    it('should respond with the updated orderdetail on a subsequent GET', function(done) {
      request(app)
        .get(`/api/orderdetails/${newOrderdetail._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let orderdetail = res.body;

          orderdetail.name.should.equal('Updated Orderdetail');
          orderdetail.info.should.equal('This is the updated orderdetail!!!');

          done();
        });
    });
  });

  describe('PATCH /api/orderdetails/:id', function() {
    var patchedOrderdetail;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/orderdetails/${newOrderdetail._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Orderdetail' },
          { op: 'replace', path: '/info', value: 'This is the patched orderdetail!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedOrderdetail = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedOrderdetail = {};
    });

    it('should respond with the patched orderdetail', function() {
      patchedOrderdetail.name.should.equal('Patched Orderdetail');
      patchedOrderdetail.info.should.equal('This is the patched orderdetail!!!');
    });
  });

  describe('DELETE /api/orderdetails/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/orderdetails/${newOrderdetail._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when orderdetail does not exist', function(done) {
      request(app)
        .delete(`/api/orderdetails/${newOrderdetail._id}`)
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
