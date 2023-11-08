const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3),
    businessType: Joi.string().required().min(3),
    address: Joi.string().required().min(3),
    phoneNumber: Joi.string().required().min(9),
    website: Joi.string().required(),
    companySize: Joi.number().required()
  })
};

const getCompanies = {
  query: Joi.object().keys({
    name: Joi.string(),
    businessType: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    website: Joi.string,
    companySize: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  })
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId)
  })
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      businessType: Joi.string(),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      website: Joi.string,
      companySize: Joi.number()
    })
    .min(1)
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId)
  })
};

module.exports = {
  createCompany,
  getCompany,
  getCompanies,
  updateCompany,
  deleteCompany
};
