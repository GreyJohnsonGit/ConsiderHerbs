const express = require('./config/express.js')
import glossaryRouter from './routes/glossaryRouter.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from '../config/config.js';
 
// Use env port or default
const port = process.env.PORT || 5000;

//connect to db
mongoose.connect(config.db.uri);

const app = express.init()
//pulled from bootcamp for bodyParsing
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//serve static files
app.use('/', express.static('./../client'));

//set up api path for the glossary - this URL will be used to route requests for the glossary
//urls within this are routed in glossaryRouter
app.use('/api/glossary', glossaryRouter);








app.listen(port, () => console.log(`Server now running on port ${port}!`));
