'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName : 'todos',
    Key: {
      id: event.path.id
    }
  };

  return dynamoDb.delete(params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(error, params.Key);
    }
  });
};
