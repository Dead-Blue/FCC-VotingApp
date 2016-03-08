var User = require('mongoose').model('User');
var passport = require('passport');

//user signUp
exports.signUp = function (req, res, next) {
    if(!req.user){
        var user = new User(req.body);
        user.username=user.username.toLowerCase();
        user.provider='local';
        user.save(function(err) {
            if(err) {
                return res.send({
                    message: 'Register User Failed',
                    success: false
                });
            }
            req.login(user, function(err) {
                if (err) return next(err);
                return res.send({
                    message: 'Register Success',
                    success: true,
                    user:user
                });
            });
        });
    } else {
        return res.send({
            message: 'User is already login',
            success: false
        });
    }
};
