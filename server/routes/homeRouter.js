const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    homeRouter = express.Router()

homeRouter.route('/')
  .get(examples.hello);
  
module.exports = homeRouter;