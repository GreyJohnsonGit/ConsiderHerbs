ThreadController = require('../controllers/ThreadController.js');
express = require('express'); 
const forumRouter = express.Router()

forumRouter.get('/:thread_id', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

forumRouter.options('/', (req, res, next) => {
    console.log("REDEF")
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

forumRouter.options('/:title', (req, res, next) => {
    console.log("REOUTER")
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

//calls read, request should include url param :thread_id for entry to grab (thread_id refers to _id attribute of thread, named for clarity)
// GET: /api/Forum/:thread_id
forumRouter.get('/:thread_id', ThreadController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/Forum/:title
forumRouter.delete('/:title', ThreadController.remove);

//returns all replies within a thread
//GET: /api/Forum/:title/replies
forumRouter.get('/:title/replies',ThreadController.getAllReplies);



module.exports = forumRouter;