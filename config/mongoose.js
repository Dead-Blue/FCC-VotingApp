var config = require('./config'),
    mongoose = require('mongoose');
module.exports = function() {
    var db = mongoose.connect(config.development.db);
    require('../Server/model/user.js');
    require('../Server/model/poll.js');
    return db;
};