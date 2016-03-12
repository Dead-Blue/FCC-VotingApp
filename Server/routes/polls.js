var user = require('../controller/user.js');
var poll = require('../controller/poll.js');
module.exports = function(app) {
   app.route('/poll')
       .get(poll.getPollsList)
   app.route('/polls')   
       .post(user.requiresLogin,poll.createPoll);
   app.route('/polls/:pollId')
       .get(poll.read)
       .post(poll.vote)
       .put(poll.addOption)
       .delete(user.requiresLogin,poll.deletePoll)

   app.param('pollId',poll.pollById);
};