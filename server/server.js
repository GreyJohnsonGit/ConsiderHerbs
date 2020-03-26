const bodyParser = require('body-parser');
const expressStatic = require('express-static');
const cors = require('cors');
//const mongoose = require('mongoose');

const express = require('./config/express.js')
const glossaryRouter = require('./routes/glossaryRouter.js');
const signinRouter = require('./routes/signinRouter.js');
//const config = require('./config/config.js');

// Use env port or default
const port = process.env.PORT || 5000;

//Initialize express lanes
const app = express.init()

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

//Serve static files
app.use('/', expressStatic('./client/'));

//Listen for requests on 'port'
app.listen(port, () => console.log(`Server now running on port ${port}!`));