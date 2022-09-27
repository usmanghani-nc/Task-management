require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const dynamodb = require('../db-client');

module.exports = async ({ event }) => {
  const body = JSON.parse(event.body);

  const d = new Date();

  const newTask = {
    id: uuidv4(),
    ...body,
    timestamp: d.getTime(),
  };

  try {
    await dynamodb.put({ TableName: process.env.TABLE_NAME, Item: newTask }).promise();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify({
        data: newTask,
        message: 'Task created',
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
