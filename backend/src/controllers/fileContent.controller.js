const {fileService} = require('../services');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const fs = require("fs");
const path = require("path");

const getFileContent = catchAsync(async (req, res) => {
  const file = await fileService.getFileById(req.params.fileId);
  console.log(file);

  console.log('fileName: ', file.fileName);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const read = fs.createReadStream(path.resolve(__dirname, `../../file/${file.fileName}`));
  read.pipe(res);
});


const getFilesContent = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy', 'fileType', 'getFiles', 'fileSize']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await fileService.queryFiles(filter, options);
  const read = fs.createReadStream(path.resolve(__dirname, `../../file/${file.fileName}`));
  read.pipe(res);
})

module.exports = {
getFileContent,
  getFilesContent
};
