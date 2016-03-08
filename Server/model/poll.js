var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PollSchema = new Schema({
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
        required:'Require Poll Title'
    },
    options:[{
        option:String,
        count:{
            type:Number,
            default:0
        }
    }]
});
mongoose.model('Poll',PollSchema);