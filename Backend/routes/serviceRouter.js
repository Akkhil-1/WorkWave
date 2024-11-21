const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");
const authMiddleware = require('../middlewares/businessOwnerMiddleware')

router.post(
    "/addservice",
    authMiddleware,
    servicesController.addService
  );
  
module.exports = router;