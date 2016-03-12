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
                    message: 'Register User Failed.,Username is already exist',
                    success: false
                });
            }
            req.login(user, function(err) {
                if (err) return next(err);
                user.password="";
                user.salt="";
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

exports.Login = function (req, res) {
    res.send({
        success:true,
        user:req.user
    });
};


    exports.requiresLogin = function(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not Login！',
                success: false
            });
        }
        next();
    };

exports.signOut = function(req, res) {
	req.logout();
	res.send({success:true,message:"Sign out success!"});
};