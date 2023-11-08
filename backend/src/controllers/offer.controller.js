const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {offerService} = require('../services');
const {uploadFile} = require('./file.controller');
const {fileService} = require('../services');
const {tenderService} = require('../services');
const {sendWinningOfferEmail} = require('../services/email.service');
const {userService} = require('../services');

const createOffer = catchAsync(async (req, res) => {

  try {
    // console.log('offer controller');
    //console.log('req.file',req.file);
    // console.log('req.body',req.body);

    const saveFile = await uploadFile(req, res);

    const files = await fileService.queryFiles({}, {limit: 9999999});

    const lastUploadedFile = files.results[files.results.length - 1];

    //  console.log('LAST UPLOADED FILE',lastUploadedFile);
    //console.log('LAST UPLOADED FILE',lastUploadedFile.id);

    const tenderId = req.body.tender;
    console.log(tenderId);
    const minimumWeightage = await tenderService.getTenderById(tenderId);
    console.log('tender', minimumWeightage);

    if (minimumWeightage.weightage > req.body.offer) {
      console.log('Minimum offer has to be larger than tender weightage');
      return res.status(400).json({error: 'Minimum offer has to be larger than tender weightage'});

    } else {

      const offerData = {
        ...req.body,
        documents: lastUploadedFile.id
      }

      console.log('offerData:', offerData);

      const offer = await offerService.createOffer(offerData);

      res.send(offer);
    }

  } catch (error) {
    console.error(error);
  }
});

const getOffers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tender', 'company', 'createdBy', 'isSelected']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await offerService.queryOffers(filter, options);
  res.send(result);
});

const getOffer = catchAsync(async (req, res) => {
  const offer = await offerService.getOfferById(req.params.offerId);
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  res.send(offer);
});

const updateOffer = catchAsync(async (req, res) => {
  const offer = await offerService.updateOfferById(req.params.offerId, req.body);
  res.send(offer);
});

const deleteOffer = catchAsync(async (req, res) => {
  await offerService.deleteOfferById(req.params.offerId);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendEmail = async (req, res) => {
  const offer = req.body;

  console.log('offer controller', req.body);
  try {
    await sendWinningOfferEmail(offer);
    console.log('Email sent successfully');
    res.status(httpStatus.OK).send();
  } catch (error) {
    console.error('Error occurred while sending email', error);
  }
}

module.exports = {
  createOffer,
  getOffers,
  getOffer,
  updateOffer,
  deleteOffer,
  sendEmail
};
