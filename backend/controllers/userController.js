const asyncHandler = require("express-async-handler")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
// @desc Register a User
// @route POST/api/users/register
// @access public
const registerUser = asyncHandler(async(req,res)=>{
    const {isOwner,email,username,password,foodserving, messname,contactno} = req.body;
    console.log(req.body)
        if ( !email || !username || !password || !foodserving) {
            res.status(400);
            throw new Error("All Fields are mandatory"); 
         }
         const userAvailable = await User.findOne({email});
         if (userAvailable) {
            res.status(400);
            throw new Error("User already registered!");
        }
        const hashedPassword = await bcrypt.hash(password,10);  //No of salt round for hasing of password
        console.log("Hashed Password: ",hashedPassword);
        let user;
        if(isOwner){
            if(!messname || !contactno ){
                res.status(400);
                throw new Error("All Fields are mandatory"); 
            }
            user= await User.create({
    
                isOwner,email,username,password:hashedPassword,foodserving,messname,contactno
            });
        }else{
            console.log("heree??")
            user = await User.create({
    
                isOwner,email,username,password:hashedPassword,foodserving
            });
        }
        

       
        console.log(`User created ${user}`);
        if (user) {
            res.status(201).json({_id:user.id,email:user.email});
        }
        else{
            res.status(400);
            throw new Error("User data not valud"); 
    }
    

});

// @desc login User
// @route POST/api/users/login
// @access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if (!email || !password) {
       res.status(400);
       throw new Error("All Fields are mandatory"); 
    }
    const user = await User.findOne({email});
     // Compare password with harshedpassword
     if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            // Payload
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"18880000m"
        }
        );
        res.status(200).json({accessToken,user})
    }
        else{
            res.status(401)
            throw new Error("Email or Password not Valid");
        }
    // res.json({message:"Login user"})
});

// @desc Current User
// @route POST/api/users/current
// @access private
const currentUser = asyncHandler(async(req,res) =>{
    console.log(req.user,"userr from apiiiii")
    res.json({user: req.user});
});

module.exports={registerUser,loginUser,currentUser}