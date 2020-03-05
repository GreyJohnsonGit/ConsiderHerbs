const glossaryItem = require('../models/glossaryentry.js')

exports.filter = function(req, res) {
    // return glossary entries that contain the filter word in their title, or other descriptions
    res.send('world')
};