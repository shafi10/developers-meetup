const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            text:{
                type:String,
        required:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})
const Post = model('Post', postSchema)

module.exports = Post