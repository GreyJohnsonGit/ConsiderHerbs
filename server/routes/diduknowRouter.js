DidYouKnowController = require('../controllers/DidYouKnowController.js');
express = require('express'); 
const didyouknowRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

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

const didyouknowModel = require('../models/DidYouKnow.js');

didyouknowRouter.put("/:title/image", upload.single('image'), (req, res, next) => {
    const model = didyouknowModel; 
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
  
module.exports = didyouknowRouter;