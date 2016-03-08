var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VoteSchema = new Schema({
    creator:{
        type:Schema.ObjectId,
        ref:'User'
    },
    created:{
        type:Date,
        default:Date.now()
    },
    title:{
        type:String,
        required:'Require Vote Title'
    },
    options:[{
        option:String,
        count:{
            type:Number,
            default:0
        }
    }]
});

mongoose.model('Vote',VoteSchema);