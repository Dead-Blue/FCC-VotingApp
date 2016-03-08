var user = require('../controller/user.js');
var poll = require('../controller/poll.js');
module.exports = function(app) {
   app.route('/polls')
       .get(user.requiresLogin,poll.getPollsList)
       .post(user.requiresLogin,poll.createPoll);
   app.route('/poll/:pollId')
       .post(user.requiresLogin,poll.vote)
       .put(user.requiresLogin,poll.addOption);

   app.param('pollId',poll.pollById);
};