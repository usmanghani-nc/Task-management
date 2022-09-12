require('dotenv').config();
const dynamodb = require('../db-client');

module.exports = async ({ id }) => {
  try {
    const data = await dynamodb
      .get({
        TableName: process.env.TABLE_NAME,
        Key: { id },
      })
      .promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: data.Item,
        status: 'success',
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
