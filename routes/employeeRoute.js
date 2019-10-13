var express = require('express');
var router = express.Router();
var mongoDB = require('../model/mongodb')
const commonService = require('../service/commonService')
const collection = 'employee';

const employeeController = require('../controller/employeeController')
const attendanceController = require('../controller/attendanceController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/add', employeeController.add)
router.get('/getAll', employeeController.getAll)
router.delete('/delete', employeeController.delete)
router.post('/punch', attendanceController.punch)
router.post('/punchDetails', attendanceController.getPunchDetails)
router.get('/punchDetailsAll', attendanceController.getPunchDetailsAll)

module.exports = router;
