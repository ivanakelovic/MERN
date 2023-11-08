const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require("../../validations/company.validation");
const companyController = require("../../controllers/company.controller")

const router = express.Router();

router
  .route('/')
  .post(auth('manageCompanies'), validate(companyValidation.createCompany), companyController.createCompany)
  .get(auth('getCompanies'), validate(companyValidation.getCompanies), companyController.getCompanies);

router
  .route('/:companyId')
  .get(auth('getCompanies'), validate(companyValidation.getCompany), companyController.getCompany)
  .patch(auth('manageCompanies'), validate(companyValidation.updateCompany), companyController.updateCompany)
  .delete(auth('manageCompanies'), validate(companyValidation.deleteCompany), companyController.deleteCompany)

module.exports = router;
