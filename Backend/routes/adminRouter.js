const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const userValidation = require("../middlewares/userValidate");

router.post("/signup", userValidation, adminController.register);
router.post("/login", adminController.login);
// forgot password api
// delete user
router.post("/delete-admin/:_id", adminController.deleteAdmin);
// update info of user
router.post("/update-admin/:_id", adminController.updateAdmin);
module.exports = router;
