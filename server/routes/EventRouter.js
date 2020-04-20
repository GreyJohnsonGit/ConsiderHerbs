EventController = require('../controllers/EventController.js');
express = require('express'); 
const EventRouter = express.Router();

EventRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

EventRouter.options('/:name', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

EventRouter.options('/:name/price', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

EventRouter.options('/:name/date', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//returns all entries, vanilla get request
// GET: /api/Event/
EventRouter.get('/', EventController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Event/
EventRouter.post('/', EventController.create);

//calls update, request should send updated entry in req.body and have url param :name
// PUT: /api/Event/:name
EventRouter.put('/:id', EventController.update);

//calls read, request should include url param :name for entry to grab
// GET: /api/Event/:name
EventRouter.get('/:name', EventController.read);

//calls remove, request should include url param :name for entry to remove
// DELETE: /api/Event/:name
EventRouter.delete('/:id', EventController.remove);

//returns the price of a Event
//GET: /api/Event/:name/price
EventRouter.get('/:name/price',EventController.giveEventPrice);

//returns the date of a given Event name
//GET : /api/Event/:name/date
EventRouter.get('/:name/date', EventController.getEventDate);
  
module.exports = EventRouter;