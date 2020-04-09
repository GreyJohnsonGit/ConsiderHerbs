DidYouKnowController = require('../controllers/DidYouKnowController.js');
express = require('express'); 
const didyouknowRouter = express.Router()



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
//GET: /api/Forum/:title/replies
forumRouter.get('/:title/replies',ThreadController.getAllReplies);
  
module.exports = didyouknowRouter;