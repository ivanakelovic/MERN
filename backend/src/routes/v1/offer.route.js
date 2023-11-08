const express = require('express');
const auth = require('../../middlewares/auth');
const uploadMiddleware = require('../../middlewares/fileUpload');
const validate = require('../../middlewares/validate');
const offerValidation = require('../../validations/offer.validation');
const offerController = require('../../controllers/offer.controller');

const router = express.Router();

router
  .route('/')

  .post(auth('manageOffers'), uploadMiddleware.single('documents'), validate(offerValidation.createOffer), offerController.createOffer)
  .get(auth('getOffers'), validate(offerValidation.getOffers), offerController.getOffers)


router
  .route('/:offerId')
  .get(auth('getOffers'), validate(offerValidation.getOffer), offerController.getOffer)
  .patch(auth('manageOffers'), validate(offerValidation.updateOffer), offerController.updateOffer)
  .delete(auth('manageOffers'), validate(offerValidation.deleteOffer), offerController.deleteOffer)
  .put(auth('manageOffers'), validate(offerValidation.updateOffer), offerController.updateOffer)

router
  .route('/send-email')
  .post(auth('manageOffers'), offerController.sendEmail);



module.exports = router;


