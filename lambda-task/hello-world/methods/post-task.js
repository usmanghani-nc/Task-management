require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const dynamodb = require('../db-client');

module.exports = async ({ event }) => {
  const body = JSON.parse(event.body);

  const newTask = {
    id: uuidv4(),
    ...body,
  };

  try {
    const data = await dynamodb.put({ TableName: process.env.TABLE_NAME, Item: newTask }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        data,
        message: 'Task created',
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
