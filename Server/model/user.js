var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type:String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length >6;
            },
            'Password should be longer'
        ]},
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    }
});

UserSchema.pre('save', function(next) {
    if(this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({ username: new RegExp(username, 'i')},callback);
};


UserSchema.set('toJSON', {
    getters:true,
    virtuals:true
});

mongoose.model('User', UserSchema);