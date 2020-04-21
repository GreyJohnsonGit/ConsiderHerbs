ProductController = require('../controllers/ProductController.js');
express = require('express'); 
const ProductRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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
ProductRouter.get('/GetAll', ProductController.getAll)

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

const ProductModel = require('../models/Product.js');

ProductRouter.put("/:name/image", upload.single('image'), (req, res, next) => {
    const model = ProductModel; 
    let item = req.body;
    if (!req.file) {
     res.send('Please upload a file');
    }
    model.findOneAndUpdate({name: req.params.name}, item).exec();
    item.name = req.params.name;
    var bitmap = fs.readFileSync(req.file.path);
    item.image = new Buffer(bitmap).toString('base64');
    res.send(item); 
  });
module.exports = ProductRouter;
