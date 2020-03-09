const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    aboutRouter = express.Router()

aboutRouter.route('/')
  .get(examples.hello);
  
module.exports = aboutRouter;