var mongoDB = require('../model/mongodb')
const commonService = require('../service/commonService')
const collection = 'emp_attendance';

module.exports = {

    punch: async (req, res) => {
        try {
            let _id = req.body.id ? mongoDB.getPrimaryKey(req.body.id) : null

            let punchDetails = { emp_id: _id, datetime: new Date() }


            mongoDB.getDB().collection(collection).insertOne(punchDetails)
                .then(result => {

                    console.log(result);

                    let data = { id: result.insertedId }
                    commonService.sendResponse(req, res, 1, 200, "ADD SUCCESS", "Added Successfully!", data)
                    // res.json(result)
                })
                .catch(err => {
                    console.log(err);
                    commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)

                })


        } catch (error) {

        }
    },

    getPunchDetails: (req, res) => {
        try {
            let _id = req.body.id ? mongoDB.getPrimaryKey(req.body.id) : null

            let punchDetails = { emp_id: _id, datetime: new Date() }


            mongoDB.getDB().collection(collection).find({ emp_id: _id }).toArray()
                .then(result => {

                    console.log(result);

                    commonService.sendResponse(req, res, 1, 200, "GET SUCCESS", "Details found!", result)
                    // res.json(result)
                })
                .catch(err => {
                    console.log(err);
                    commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)

                })


        } catch (error) {
            console.log(error);

        }
    },

    getPunchDetailsAll: (req, res) => {
        try {
           
         /*    let punchDetails = { emp_id: _id, datetime: new Date() } */


            mongoDB.getDB().collection(collection).aggregate( [
                { "$group": {
                    "emp_id": "$emp_id",
                    "count": { "$sum": 1 }
                }}
            ],).toArray()
                .then(result => {

                    console.log(result);

                    commonService.sendResponse(req, res, 1, 200, "GET SUCCESS", "Details found!", result)
                    // res.json(result)
                })
                .catch(err => {
                    console.log(err);
                    commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)

                })


        } catch (error) {
            console.log(error);

        }
    }

}