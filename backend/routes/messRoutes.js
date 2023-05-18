const express = require("express");
const router = express.Router();
const {getMesses,
    createMess,
    getMess,
    updateMess,
    deleteMess
}=require("../controllers/messController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken)
router.route("/").get(getMesses).post(createMess);
router.route("/:id").get(getMess).put(updateMess).delete(deleteMess)




module.exports = router;