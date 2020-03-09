const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    signinRouter = express.Router()

signinRouter.route('/')
  .get(examples.hello);
  
module.exports = signinRouter;