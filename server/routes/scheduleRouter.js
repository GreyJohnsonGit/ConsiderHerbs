const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    scheduleRouter = express.Router()

scheduleRouter.route('/')
  .get(examples.hello);
  
module.exports = scheduleRouter;