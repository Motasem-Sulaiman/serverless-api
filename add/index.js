'use strict';
const dynamoose = require('dynamoose');
const peopleSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'phone': String,
});

const peopleModel = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {
    let { id, name, phone } = event.queryStringParameters;
    let newContact = { id, name, phone };
    let myResponse = {
        statusCode: null,
        body: null
    }
    try {
        let newFriend = await peopleModel.create(newContact);
        myResponse.statusCode = 200;
        myResponse.body = JSON.stringify(newFriend)
    }
    catch (error) {
        myResponse.statusCode = 500;
        myResponse.body = JSON.stringify(error.message);
    }

    return myResponse;

}