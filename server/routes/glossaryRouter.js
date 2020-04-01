const GlossaryController = require('../controllers/GlossaryController.js');
const express = require('express'); 
const glossaryRouter = express.Router()

//Allows for Cross Domain Requests CORS
glossaryRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//Allows for Cross Domain Requests CORS
glossaryRouter.options('/:title', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//calls update, request should send updated entry in req.body and have url param :title
// PUT: /api/glossary/:title
glossaryRouter.put('/:title', GlossaryController.update);

//calls read, request should include url param :title for entry to grab
// GET: /api/glossary/:title
glossaryRouter.get('/:title', GlossaryController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/glossary/:title
glossaryRouter.delete('/:title', GlossaryController.remove);

//returns all entries, vanilla get request
// GET: /api/glossary/
glossaryRouter.get('/', GlossaryController.getAll)

//calls create, request should send entry in req.body
// POST: /api/glossary/
glossaryRouter.post('/', GlossaryController.create);

  
module.exports = glossaryRouter;