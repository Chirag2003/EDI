const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the username"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email Address already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"]
    },
    foodserving:{
        type:String,
        required:[true,"Please add your food preferences"]
    },
    isOwner:{
        type:Boolean,
        default:false
    },
    messname:{
        type:String,
       
    },
    contactno:{
        type:String,
       
    },

},{
    timestamp:true,
}
);

module.exports = mongoose.model("User",userSchema)