const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createOffer = {
  body: Joi.object().keys({
    offer: Joi.number().required(),
    tender: Joi.string().required(),
    createdBy: Joi.string().required(),
    documents: Joi.string(),
    isSelected: Joi.boolean()
  }),
};
const updateOffer = {
  params: Joi.object().keys({
    offerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      isSelected: Joi.boolean()
    })
    .min(1),
};
const getOffer = {
  params: Joi.object().keys({
    offerId: Joi.string().custom(objectId),
  }),
};
const deleteOffer = {
  params: Joi.object().keys({
    offerId: Joi.string().custom(objectId),
  }),
};
const getOffers = {
  query: Joi.object().keys({
    offer: Joi.string(),
    createdBy: Joi.string(),
    // company: Joi.string(),
    tender: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    isSelected: Joi.boolean()
  }),
};
module.exports = {
  createOffer,
  getOffer,
  deleteOffer,
  updateOffer,
  getOffers
};
