const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fileValidation = require("../../validations/file.validation");
const fileContentController = require("../../controllers/fileContent.controller");

const router = express.Router();

router
  .route('/')
  .get(auth('getFiles'), validate(fileValidation.getFiles), fileContentController.getFilesContent)
router
  .route('/:fileId')
  .get(auth('getFiles'), validate(fileValidation.getFile), fileContentController.getFileContent)

module.exports = router;
