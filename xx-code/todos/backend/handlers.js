'use strict';

const todosCreate = require('./todos-create.js');
const todosReadAll = require('./todos-read-all.js');
const todosReadOne = require('./todos-read-one.js');
const todosUpdate = require('./todos-update.js');
const todosDelete = require('./todos-delete.js');

module.exports.create = (event, context, callback) => {
  todosCreate(event, (error, response) => {
    context.done(error, response);
  });
};

module.exports.readAll = (event, context, callback) => {
  todosReadAll(event, (error, response) => {
    context.done(error, response);
  });
};

module.exports.readOne = (event, context, callback) => {
  todosReadOne(event, (error, response) => {
    context.done(error, response);
  });
};

module.exports.update = (event, context, callback) => {
  todosUpdate(event, (error, response) => {
    context.done(error, response);
  });
};

module.exports.delete = (event, context, callback) => {
  todosDelete(event, (error, response) => {
    context.done(error, response);
  });
};
