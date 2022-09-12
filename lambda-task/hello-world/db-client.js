'use strict';

const AWS = require('aws-sdk');

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    endpoint: 'http://127.0.0.1:3000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
