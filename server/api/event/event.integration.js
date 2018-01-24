'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEvent;

describe('Event API:', function() {
  describe('GET /api/Events', function() {
    var Events;

    beforeEach(function(done) {
      request(app)
        .get('/api/Events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Events.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/Events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Events')
        .send({
          name: 'New Event',
          info: 'This is the Event new Event!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created Event', function() {
      newEvent.name.should.equal('New Event');
      newEvent.info.should.equal('This is the Event new Event!!!');
    });
  });

  describe('GET /api/Events/:id', function() {
    var Event;

    beforeEach(function(done) {
      request(app)
        .get(`/api/Events/${newEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Event = res.body;
          done();
        });
    });

    afterEach(function() {
      Event = {};
    });

    it('should respond with the requested Event', function() {
      Event.name.should.equal('New Event');
      Event.info.should.equal('This is the Event new Event!!!');
    });
  });

  describe('PUT /api/Events/:id', function() {
    var updatedEvent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/Events/${newEvent._id}`)
        .send({
          name: 'Updated Event',
          info: 'This is the updated Event!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvent = {};
    });

    it('should respond with the updated Event', function() {
      updatedEvent.name.should.equal('Updated Event');
      updatedEvent.info.should.equal('This is the updated Event!!!');
    });

    it('should respond with the updated Event on a subsequent GET', function(done) {
      request(app)
        .get(`/api/Events/${newEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let Event = res.body;

          Event.name.should.equal('Updated Event');
          Event.info.should.equal('This is the updated Event!!!');

          done();
        });
    });
  });

  describe('PATCH /api/Events/:id', function() {
    var patchedEvent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/Events/${newEvent._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Event' },
          { op: 'replace', path: '/info', value: 'This is the patched Event!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEvent = {};
    });

    it('should respond with the patched Event', function() {
      patchedEvent.name.should.equal('Patched Event');
      patchedEvent.info.should.equal('This is the patched Event!!!');
    });
  });

  describe('DELETE /api/Events/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/Events/${newEvent._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Event does not exist', function(done) {
      request(app)
        .delete(`/api/Events/${newEvent._id}`)
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
