"use strict";
const dynamoose = require("dynamoose");
const peopleModel = require("./people.schema");

exports.handler = async (event) => {
  try {
    if (event.pathParameters && event.pathParameters.id) {
      const id = event.pathParameters.id;

      const data = await peopleModel.get(id);

      if (data) {
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: "true",
            message: "Record not found",
          }),
        };
      }
    } else {
      const data = await peopleModel.scan().exec();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "true",
        message: error.message,
      }),
    };
  }
};
