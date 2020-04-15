ThreadController = require('../controllers/ThreadController.js');
express = require('express'); 
const forumRouter = express.Router()

forumRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

forumRouter.options('/:title', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

forumRouter.options('/:title/replies', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})


//returns all entries, vanilla get request
// GET: /api/Forum/
forumRouter.get('/', ThreadController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Forum/
forumRouter.post('/', ThreadController.create);

//calls update, request should send updated entry in req.body and have url param :title
// PUT: /api/Forum/:title
forumRouter.put('/:title', ThreadController.update);

//calls read, request should include url param :title for entry to grab
// GET: /api/Forum/:title
forumRouter.get('/:title', ThreadController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/Forum/:title
forumRouter.delete('/:title', ThreadController.remove);

//returns all replies within a thread
//GET: /api/Forum/:title/replies
forumRouter.get('/:title/replies',ThreadController.getAllReplies);

// returns all threads created by a given user's username
//GET: /api/Forum/:user
forumRouter.get('/:user/posts', ThreadController.getAllThreadsfromOneUser);

module.exports = forumRouter;