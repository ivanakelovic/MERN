const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createEvaluation = {
  body: Joi.object().keys({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
    collaborators: Joi.string().required(),
    offer: Joi.string().required()
    // email: Joi.string().required().email(),
    //password: Joi.string().required().custom(password),
    // name: Joi.string().required(),
    //  proposal: Joi.string().length(24).hex().required(),
    //  role: Joi.string().required().valid('evaluation', 'admin'),
  }),
};

const getEvaluations = {
  query: Joi.object().keys({
    name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.string().custom(objectId),
  }),
};

const updateEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
};
