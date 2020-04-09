ProductController = require('../controllers/ProductController.js');
express = require('express'); 
const ProductRouter = express.Router()

ProductRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

ProductRouter.options('/:name', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

ProductRouter.options('/:name/price', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//returns all entries, vanilla get request
// GET: /api/Product/
ProductRouter.get('/', ProductController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Product/
ProductRouter.post('/', ProductController.create);

//calls update, request should send updated entry in req.body and have url param :name
// PUT: /api/Product/:name
ProductRouter.put('/:name', ProductController.update);

//calls read, request should include url param :name for entry to grab
// GET: /api/Product/:name
ProductRouter.get('/:name', ProductController.read);

//calls remove, request should include url param :name for entry to remove
// DELETE: /api/Product/:name
ProductRouter.delete('/:name', ProductController.remove);

//returns the price of a Product
//GET: /api/Product/:name/price
ProductRouter.get('/:name/price',ProductController.giveProductPrice);
  
module.exports = ProductRouter;