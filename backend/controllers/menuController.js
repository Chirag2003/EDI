const asyncHandler = require("express-async-handler"); 
const Menu = require("../models/MenuModel")

const getMenus = asyncHandler(async(req,res) => {
    const Menus = await Menu.find({user_id:req.user.id});
    res.status(200).json(Menus);
});

const createMenu = asyncHandler(async(req,res) => {
    console.log("The request Body is :",req.body)
    const{Date,Meals,Price,Sabji1,Sabji2,Sabji3,Rice,Drinks,Roti} = req.body;
    if (!Date|| !Meals || !Price || !Sabji1 || !Sabji2 || !Sabji3 || !Rice || !Drinks || !Roti) {
        res.status(400);
        throw new Error("All Fields are mandatory !");

    }
    const Sabji = {
        Sabji1,Sabji2,Sabji3
    }
    const MenuDetails = await Menu.create({
        Date,Meals,Price,Sabji,Rice,Drinks,Roti,user_id:req.user.id
    });
    res.status(201).json(MenuDetails);
});

const getMenu = asyncHandler(async(req,res) => {
    const MenuSpecific = await Menu.findById(req.params.id);
    if (!MenuSpecific) {
        res.status(404);
        throw new Error("Menu not found");
    }
    res.json(MenuSpecific);

});

const updateMenu = asyncHandler(async(req,res) => {
    const MenuSpecific = await Menu.findById(req.params.id);
    if (!MenuSpecific) {
        res.status(404);
        throw new Error("Menu not found");
    }
    if (MenuSpecific.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user content")
    }
    const updateMenu = await Menu.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updateMenu);

});

// @desc DELETE Menu 
// @route GET/api/menu/:id
// @access public
const deleteMenu = asyncHandler(async(req,res) => {
    const MenuSpecific = await Menu.findById(req.params.id);
    if (!MenuSpecific) {
        res.status(404);
        throw new Error("Menu not found");
    }
    if (MenuSpecific.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user content")
    }
    const deleteMenu = await Menu.findByIdAndRemove(req.params.id);
    res.json(deleteMenu);
});
module.exports={createMenu,getMenus,getMenu,updateMenu,deleteMenu}
