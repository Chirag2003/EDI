const asyncHandler = require("express-async-handler"); 
const Mess = require("../models/MessModel")
// @desc Get all Mess 
// @route GET/api/mess
// @access private
const getMesses = asyncHandler(async(req,res) => {
    const Messes = await Mess.find({user_id:req.user.id});
    res.status(200).json(Messes);
});

// @desc Create New Mess 
// @route POST/api/mess
// @access private
const createMess = asyncHandler(async(req,res) => {
    console.log("The request Body is :",req.body)
    const{isOwner,email,username,password,messname,contactno,foodserving} = req.body;
    if (!isOwner|| !email || !username || !password || !messname || !contactno || !foodserving) {
        res.status(400);
        throw new Error("All Fields are mandatory !");

    }
    const MessDetails = await Mess.create({
        isOwner,email,username,password,messname,contactno,foodserving,user_id:req.user.id
    });
    res.status(201).json(MessDetails);
});
// @desc Get  Mess 
// @route GET/api/mess/:id
// @access private
const getMess = asyncHandler(async(req,res) => {
    const MessSpecific = await Mess.findById(req.params.id);
    if (!MessSpecific) {
        res.status(404);
        throw new Error("Mess not found");
    }
    res.json(MessSpecific);
});

// @desc Update Mess 
// @route GET/api/mess
// @access private
const updateMess = asyncHandler(async(req,res) => {
    const MessSpecific = await Mess.findById(req.params.id);
    if (!MessSpecific) {
        res.status(404);
        throw new Error("Mess not found");
    }
    if (MessSpecific.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user content")
    }
    const updateMess = await Mess.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updateMess);

});

// @desc DELETE Mess 
// @route GET/api/mess/:id
// @access public
const deleteMess = asyncHandler(async(req,res) => {
    const MessSpecific = await Mess.findById(req.params.id);
    if (!MessSpecific) {
        res.status(404);
        throw new Error("Mess not found");
    }
    if (MessSpecific.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user content")
    }
    const deleteMess = await Mess.findByIdAndRemove(req.params.id);
    res.json(deleteMess);
});



module.exports = 
    {getMesses,
    createMess,
    getMess,
    updateMess,
    deleteMess};