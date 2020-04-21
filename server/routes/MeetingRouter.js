MeetingController = require('../controllers/MeetingController.js');
express = require('express'); 
const MeetingRouter = express.Router();

MeetingRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

MeetingRouter.options('/:name', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

MeetingRouter.options('/:name/price', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

MeetingRouter.options('/:name/date', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})


//returns all entries, vanilla get request
// GET: /api/Meeting/
MeetingRouter.get('/', MeetingController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Meeting/
MeetingRouter.post('/', MeetingController.create);

//calls remove, request should include url param :name for entry to remove
// DELETE: /api/Meeting/:name
MeetingRouter.delete('/:id', MeetingController.remove);
  
module.exports = MeetingRouter;