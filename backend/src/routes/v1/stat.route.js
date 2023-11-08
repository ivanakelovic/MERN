const express = require("express");
const validate = require('../../middlewares/validate');
const statsController = require("../../controllers/stat.controller");
const auth = require('../../middlewares/auth');
const statValidation = require('../../validations/stats.validation');
const tenderValidation = require("../../validations/tender.validation");


const router = express.Router();

router
  .route("/")
  .get(auth("getStats"), statsController.getStats);

router
  .route("/chart")
  .get(auth("getStats"),validate(statValidation.getChartData),statsController.getChartData);


module.exports = router;
