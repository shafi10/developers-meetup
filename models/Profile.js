const {Schema, model} = require('mongoose')

const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            }
        }
    ],
    education:[{
        school:{
            type:String,
            required:true
        },
        degree:{
            type:String,
            required:true
        }
    }],
    social:{
        youtube:{
            type:String
        },
        linkedin:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Profile = model('Profile', profileSchema)
module.exports = Profile