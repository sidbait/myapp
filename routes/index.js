var express = require('express');
const app = express();
var router = express.Router();
const empRouter = express.Router();
var mongoDB = require('../model/mongodb')
const employeeRoutes = require('./employeeRoute')
const commonService = require('../service/commonService')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-todos', function (req, res, next) {

  mongoDB.getDB().collection('todo').find({ "todo": "Clean Room" }).toArray()
    .then(doc => {
      console.log(doc);
      // res.json(doc)

      if (doc && doc.length > 0) {
        commonService.sendResponse(req, res, 1, 200, "GET SUCCESS", "Details found!",doc)
      } else {
        commonService.sendResponse(req, res, 0, 401, "GET FAILED", "Details not found!",doc)
      }

      
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })

});



router.put('/update/:id', (req, res) => {
  const todoID = mongoDB.getPrimaryKey(req.params.id);
  const todoName = req.body.todo

  mongoDB.getDB().collection('todo').findOneAndUpdate({ _id: todoID }, { $set: { todo: todoName } }, { returnOriginal: false })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err);

    })
})


router.post('/insert', (req, res) => {
  const todoName = req.body.todo

  mongoDB.getDB().collection('todo').insertOne({ todo: todoName })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err);

    })
})

empRouter.use('/employee', employeeRoutes)
router.use(empRouter)


module.exports = router;
