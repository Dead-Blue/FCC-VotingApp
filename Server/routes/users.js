var passport = require('passport');
var user = require('../controller/user.js');
module.exports = function (app) {
  app.route('/user')
      .post(user.signUp)
      .delete(user.signOut)      
     
  app.route('/authenticate')
      .post(passport.authenticate('local'),user.Login);
};
