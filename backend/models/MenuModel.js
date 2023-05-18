// MessOwner,Email,Username,Password,MessName,ContactNo,FoodServing

const mongoose = require("mongoose");

const menuSchema =mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
    // MessOwner:{
    //     type:String,
    //     required:[true,"Please Add the Contact Name"],
    // },
    Date:{
        type:String,
        // required:[true,"Please Add Date"],
    },
    Meals:{
        type:String,
        // required:[true,"Please Add the Meals"],
    },
    Price:{
        type:String,
        // required:[true,"Please Add Rice Plate Price"],
    },
    Sabji:{
        Sabji1:{
            type:String,
            // required:[true,"Please Add Sabji1"]    
        },
        Sabji2:{
            type:String,
            // required:[true,"Please Add Sabji2"]    
        },
        Sabji3:{
            type:String,
            // required:[true,"Please Add Sabji3"]    
        }
    },
    Rice:{
        type:String,
        // required:[true,"Please Add Rice"],
    },
    Roti:{
        type:String,
        // required:[true,"Please Add Roti"],
    },
    Drinks:{
        type:String,
        // required:[true,"Please Add Drinks"],
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Menu",menuSchema);
