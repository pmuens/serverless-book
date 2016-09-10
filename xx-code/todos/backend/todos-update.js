'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = event.body;

  data.id = event.path.id;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName : 'todos',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(error, params.Item);
    }
  });
};
