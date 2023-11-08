const express = require('express');
const fileController = require('../../controllers/file.controller');
const auth = require('../../middlewares/auth');
const uploadMiddleware = require('../../middlewares/fileUpload');
const validate = require('../../middlewares/validate');
const fileValidation = require("../../validations/file.validation");

const router = express.Router();

router
  .route('/')
  .post(auth('manageFiles'), uploadMiddleware.single('documents'), validate(fileValidation.createFile), fileController.uploadFile)
  .get(auth('getFiles'), validate(fileValidation.getFiles), fileController.getFiles)
router
  .route('/:fileId')
  .get(auth('getFiles'), validate(fileValidation.getFile), fileController.getFile)
  .patch(auth('manageFiles'), validate(fileValidation.updateFile), fileController.updateFile)
  .delete(auth('manageFiles'), validate(fileValidation.deleteFile), fileController.deleteFile)

module.exports = router;
