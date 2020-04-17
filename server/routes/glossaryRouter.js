const GlossaryController = require('../controllers/GlossaryController.js');
const express = require('express'); 
const glossaryRouter = express.Router()

//returns all entries, vanilla get request
// GET: /api/glossary/
glossaryRouter.get('/', GlossaryController.getAll)

//calls create, request should send entry in req.body
// POST: /api/glossary/
glossaryRouter.post('/', GlossaryController.create);

//calls update, request should send updated entry in req.body and have url param :title
// PUT: /api/glossary/:title
glossaryRouter.put('/:title', GlossaryController.update);

//calls read, request should include url param :title for entry to grab
// GET: /api/glossary/:title
glossaryRouter.get('/:title', GlossaryController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/glossary/:title
glossaryRouter.delete('/:title', GlossaryController.remove);

  
module.exports = glossaryRouter;