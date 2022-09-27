require('dotenv').config();
const dynamodb = require('../db-client');

module.exports = async ({ id, event }) => {
  try {
    const body = JSON.parse(event.body);

    const data = await dynamodb
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { id },
        UpdateExpression:
          'set task = :task, description = :description, active = :active, done = :done',
        ExpressionAttributeValues: {
          ':task': body.task,
          ':description': body.description,
          ':active': body.active,
          ':done': body.done,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
      },
      body: JSON.stringify({
        data: data,
        message: 'Item updated',
        status: 'success',
      }),
    };
  } catch (error) {
    return {
      statusCode: 501,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
      },
      body: JSON.stringify({
        error: error.message,
        status: 'error',
      }),
    };
  }
};
