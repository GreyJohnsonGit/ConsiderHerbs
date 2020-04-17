const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    diduknowRouter = express.Router()

diduknowRouter.route('/')
  .get(examples.hello);
  
module.exports = diduknowRouter;