// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const { getAllTasks, postTask, getSingleTask, deleteTask, updateTask } = require('./methods');

let response;

exports.lambdaHandler = async (event, context) => {
  try {
    const { pathParameters, httpMethod: method } = event;

    const optionalParams = {
      id: pathParameters?.id,
      event,
      context,
    };

    switch (method) {
      case 'GET':
        response = optionalParams.id ? getSingleTask(optionalParams) : getAllTasks();
        break;
      case 'POST':
        response = postTask(optionalParams);
        break;
      case 'PUT':
        response = updateTask(optionalParams);
        break;
      case 'DELETE':
        response = deleteTask(optionalParams);
        break;
      default:
        response = getAllTasks(optionalParams);
        break;
    }
  } catch (err) {
    return err.message;
  }

  return response;
};
