const path = require('path');
    express = require('express');
    mongoose = require('mongoose');
    morgan = require('morgan');
    bodyParser = require('body-parser');
    aboutRouter = require('../routes/aboutRouter');
    diduknowRouter = require('../routes/diduknowRouter');
    forumRouter = require('../routes/forumRouter');
    glossaryRouter = require('../routes/glossaryRouter');
    homeRouter = require('../routes/homeRouter');
    scheduleRouter = require('../routes/scheduleRouter');
    signinRouter = require('../routes/signinRouter');
    exampleRouter = require('../routes/examples.server.routes');


module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

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

