const GlossaryController = require('../controllers/GlossaryController.js'),
    express = require('express'), 
    glossaryRouter = express.Router()

glossaryRouter.get('/:filterString', GlossaryController.filter);
  
module.exports = glossaryRouter;