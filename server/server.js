const bodyParser = require('body-parser');
const expressStatic = require('express-static');
//const mongoose = require('mongoose');

//const config = require('./config/config.js');
const express = require('./config/express.js')
const glossaryRouter = require('./routes/glossaryRouter.js');
 
// Use env port or default
const port = process.env.PORT || 5000;

//Initialize express lanes
const app = express.init()

//Allows for http body parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Allows for communication between this server and a client in a different url
app.use('/', (res) => {
    res.header('Access-Control-Allow-Origin', '*');
});

//Serve static files
app.use('/', expressStatic('./client/'));

//Routes for glossary API
app.use('/api/glossary', glossaryRouter);

//Listen for requests on 'port'
app.listen(port, () => console.log(`Server now running on port ${port}!`));