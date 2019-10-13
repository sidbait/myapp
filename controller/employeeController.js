var mongoDB = require('../model/mongodb')
const commonService = require('../service/commonService')
const collection = 'employee';

module.exports = {

    add: async (req, res) => {

        try {

            let isInserted = await commonService.getUserByMobile(req.body.mobile_number)

            console.log('isInserted', isInserted);


            if (isInserted == 0) {

                const employeeDetails = req.body
                mongoDB.getDB().collection(collection).insertOne(employeeDetails)
                    .then(result => {
                        let data = { id: result.insertedId }
                        commonService.sendResponse(req, res, 1, 200, "ADD SUCCESS", "Added Successfully!", data)
                        // res.json(result)
                    })
                    .catch(err => {
                        console.log(err);
                        commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)

                    })

              
            } else {

                commonService.sendResponse(req, res, 0, 401, "ALREADY INSERTED", "Employee already inserted!", '')

            }

        } catch (error) {
            console.log(error);
            commonService.sendResponse(req, res, 0, 500, "ERROR", "Something went wrong!", error)
        }

    },

    getAll: async (req, res) => {
        try {

            mongoDB.getDB().collection(collection).find({}).toArray()
                .then(result => {
                    commonService.sendResponse(req, res, 1, 200, "GET SUCCESS", "Details found!", result)
                    // res.json(result)
                })
                .catch(err => {
                    console.log(err);
                    commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)

                })

        } catch (error) {
            console.log(error);
            commonService.sendResponse(req, res, 0, 500, "ERROR", "Something went wrong!", error)
        }
    },

    delete: async (req, res) => {
        let _id = req.body.id ? mongoDB.getPrimaryKey(req.body.id) : null


        if (_id) {
          try {
      
            mongoDB.getDB().collection(collection).deleteOne({ _id })
              .then(result => {
      
                console.log(result);
                let response = { count: result.deletedCount }
      
                if (result.deletedCount > 0)
                  commonService.sendResponse(req, res, 1, 200, "DELETE SUCCESS", "Delete Successfully!", response)
                else
                  commonService.sendResponse(req, res, 0, 401, "DELETE NOT FOUND", "Details not available!", response)
      
              })
              .catch(err => {
                console.log(err);
                commonService.sendResponse(req, res, 0, 500, "DB ERROR", "Something went wrong!", err)
              })
      
          } catch (error) {
            console.log(error);
            commonService.sendResponse(req, res, 0, 500, "ERROR", "Something went wrong!", err)
          }
        }
    },
}