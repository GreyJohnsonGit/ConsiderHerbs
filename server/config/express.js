const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const aboutRouter = require('../routes/aboutRouter');
const diduknowRouter = require('../routes/diduknowRouter');
const forumRouter = require('../routes/forumRouter');
const glossaryRouter = require('../routes/glossaryRouter');
const homeRouter = require('../routes/homeRouter');
const scheduleRouter = require('../routes/scheduleRouter');
const signinRouter = require('../routes/signinRouter');
const exampleRouter = require('../routes/examples.server.routes');
const recipeRouter = require('../routes/recipeRouter');
<<<<<<< Updated upstream
=======
const productRouter = require('../routes/ProductRouter');
const EventRouter = require('../routes/EventRouter');
>>>>>>> Stashed changes


module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/api/example', exampleRouter);
    app.use('/api/About', aboutRouter);
    app.use('/api/DidYouKnow', diduknowRouter);
    app.use('/api/Forum', forumRouter);
    app.use('/api/Glossary', glossaryRouter);
    app.use('/api/Home', homeRouter);
    app.use('/api/Schedule', scheduleRouter);
    app.use('/api/SignIn', signinRouter);
    app.use('/api/Recipe', recipeRouter);
<<<<<<< Updated upstream
=======
    app.use('/api/Product', productRouter);
    app.use('/api/Event', EventRouter);
>>>>>>> Stashed changes

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

