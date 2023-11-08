const httpStatus = require('http-status');
const { Evaluation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an evaluation
 * @param {Object} evaluationBody
 * @returns {Promise<Evaluation>}
 */
const createEvaluation = async (evaluationBody) => {
  return Evaluation.create(evaluationBody);
};

/**
 * Query evaluations
 * @param {Object} filter - Filter object for querying evaluations
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryEvaluation = async (filter, options) => {
  const evaluations = await Evaluation.paginate(filter, options);
  return evaluations;
};

/**
 * Get evaluation by ID
 * @param {ObjectId} id - Evaluation ID
 * @returns {Promise<Evaluation>}
 */
const getEvaluationById = async (id) => {
  return Evaluation.findById(id);
};

/**
 * Get evaluation by email
 * @param {string} email
 * @returns {Promise<Evaluation>}
 */
const getEvaluationByEmail = async (email) => {
  return Evaluation.findOne({ email });
};

/**
 * Update evaluation by ID
 * @param {ObjectId} evaluationId - Evaluation ID
 * @param {Object} updateBody - Updated evaluation data
 * @returns {Promise<Evaluation>}
 */
const updateEvaluation = async (evaluationId, updateBody) => {
  const evaluation = await Evaluation.findById(evaluationId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  if (updateBody.email && (await Evaluation.isEmailTaken(updateBody.email, evaluationId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(evaluation, updateBody);
  await evaluation.save();
  return evaluation;
};

/**
 * Delete evaluation by ID
 * @param {ObjectId} evaluationId - Evaluation ID
 * @returns {Promise<Evaluation>}
 */
const deleteEvaluationById = async (evaluationId) => {
  const evaluation = await Evaluation.findById(evaluationId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  await evaluation.remove();
  return evaluation;
};

module.exports = {
  createEvaluation,
  queryEvaluation,
  getEvaluationById,
  getEvaluationByEmail,
  updateEvaluation,
  deleteEvaluationById,
};
