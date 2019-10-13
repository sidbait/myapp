var mongoDB = require('../model/mongodb')
const collection = 'employee';

function sendResponse(req, res, success, statusCode, messageCode, message, data) {

    let response = {}
    response.success = success;
    response.statusCode = statusCode;
    response.messageCode = messageCode;
    response.message = message;
    response.data = data;

    res.json(response)
}

function getUserByMobile(mobile_number) {
    return new Promise(async (resolve, reject) => {
        let dbResult;
        try {
            dbResult = await mongoDB.getDB().collection(collection).count({ mobile_number });
            resolve(dbResult)
        } catch (error) {
            resolve(dbResult)
        }
    })
}


module.exports = {
    sendResponse,
    getUserByMobile
}

