const examples = require('../controllers/examples.server.controller.js'),
    express = require('express'), 
    forumRouter = express.Router()

forumRouter.route('/')
  .get(examples.hello);
  
module.exports = forumRouter;