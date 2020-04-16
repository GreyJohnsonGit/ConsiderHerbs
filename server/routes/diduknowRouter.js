DidYouKnowController = require('../controllers/DidYouKnowController.js');
express = require('express'); 
const didyouknowRouter = express.Router()

didyouknowRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

didyouknowRouter.options('/:title', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

didyouknowRouter.options('/:title/replies', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//returns all entries, vanilla get request
// GET: /api/DidYouKnow/
didyouknowRouter.get('/', DidYouKnowController.getAll)

//calls create, request should send entry in req.body
// POST: /api/DidYouKnow/
didyouknowRouter.post('/', DidYouKnowController.create);

//calls update, request should send updated entry in req.body and have url param :title
// PUT: /api/DidYouKnow/:title
didyouknowRouter.put('/:title', DidYouKnowController.update);

//calls read, request should include url param :title for entry to grab
// GET: /api/DidYouKnow/:title
didyouknowRouter.get('/:title', DidYouKnowController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/DidYouKnow/:title
didyouknowRouter.delete('/:title', DidYouKnowController.remove);

//returns all replies from the DidYouKnow
//GET: /api/DidYouKnow/:title/replies
didyouknowRouter.get('/:title/replies',DidYouKnowController.getAllReplies);
  
module.exports = didyouknowRouter;