var User = require('mongoose').model('User');
var Poll = require('mongoose').model('Poll');
exports.getPollsList = function(req,res){
    Poll.find({}).sort('-created').populate('creator','username').exec(function (err, polls) {
        if(err)
          return res.status(400).send({
              success:false,
              message:err.errmsg
          });
        else
          res.send({
            success:true,
            polls:polls
          });
    })
};

exports.pollById = function (req, res, next, id) {
    Poll.findById(id).populate('creator','username')
        .exec(function (err, poll) {
            if(err)
                next(err);
            else if(!poll)
                next(new Error('load poll ' + id + 'failed'));
                else {
                    req.poll = poll;
                    next();
                }
        })
};

exports.createPoll = function (req,res) {
    req.body.options=JSON.parse(req.body.options);
    var poll = new Poll(req.body);
    poll.creator = req.user;
    poll.save(function (err) {
        if(err)
            return res.status(400).send({
                success:false,
                message:err
            });
        else
            return res.send({
                success:true,
                poll:poll
            });
    });
};

exports.addOption = function (req, res) {
    Poll.findById(req.poll._id).populate('creator','username').exec(function (err, poll) {
        if(err)
            return res.status(400).send({
                success:false,
                message:err
            });
        else if(!poll)
            return res.status(400).send({
                success:false,
                message:'find poll ' + id + 'failed'
            });
        else {
            req.poll = null;
            var options = poll.options;
            var option = {option:req.body.newOption}
            options.push(option);
            poll.options= options;
            poll.save(function(err){
                if(err)
                    return res.status(400).send({
                        success:false,
                        message:'add new option failed'
                    });
                else
                    res.send({
                        success:true,
                        poll:poll
                    })
            })
        }
    })
};

exports.vote = function (req, res) {
    Poll.findById(req.poll._id).populate('creator','username').exec(function (err, poll) {
        if(err)
            return res.status(400).send({
                success:false,
                message:err.errMsg
            });
        else if(!poll)
            return res.status(400).send({
                success:false,
                message:'find poll ' + id + 'failed'
            });
        else {
            poll.options = req.body.options;
             poll.save(function(err){
                if(err)
                    return res.status(400).send({
                        success:false,
                        message:'vote failed'
                    });
                else
                    res.send({
                        success:true,
                        poll:poll
                    })
            })
        }
    })
};

exports.deletePoll = function(req,res) {
    Poll.findByIdAndRemove(req.poll._id).exec(function(err,poll){
        if(err){
            res.send({
                success:false,
                message:'delete poll failed'
            })
        }
        res.send({
            success:true,
            poll:poll
        })
    })
};

exports.read=function(req,res) {
    var poll = req.poll;
    req.poll=null,
    res.json(poll);
}