const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const { getMenus, createMenu, updateMenu, deleteMenu, getMenu }=require("../controllers/menuController")

// router.route("/").get(getMenus).post(createMenu);
// router.route("/:id").get(getMenu).put(updateMenu).delete(deleteMenu)

router.get("/viewMenu/:id",getMenu)
router.post("/create",validateToken,createMenu);

router.put("/:id",updateMenu);

router.delete("/:id",deleteMenu);
router.get("/current",validateToken,getMenus)
// router.route("/").get(getMenu).post(createMenu);
module.exports=router;