const bodyParser = require('body-parser');
const expressStatic = require('express-static');
const cors = require('cors');
const express = require('./config/express.js')
const glossaryRouter = require('./routes/glossaryRouter.js');
const signinRouter = require('./routes/signinRouter.js');
const forumRouter = require('./routes/forumRouter.js');
//const config = require('./config/config.js');
const productRouter = require('./routes/ProductRouter.js');
const fileUpload = require('express-fileupload');


// Use env port or default
const port = process.env.PORT || 5000;

//Initialize express lanes
const app = express.init()

app.use(fileUpload());


//Allows for http body parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Handles CORS policy
app.use(cors());

//Routes for glossary API
app.use('/api/Glossary', glossaryRouter);
app.use('/api/Authentication', signinRouter);
app.use('/api/Forum', forumRouter);
app.use('/api/Products', productRouter)

//Serve static files
app.use('/', expressStatic('./client/'));


// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });

//Listen for requests on 'port'
app.listen(port, () => console.log(`Server now running on port ${port}!`));