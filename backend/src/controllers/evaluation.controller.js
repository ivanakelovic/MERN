const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {evaluationService} = require('../services');
const contractService = require('../services/contractservice');
const notificationService = require('../services/notificationservice');

const createEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.createEvaluation(req.body);
  res.status(httpStatus.CREATED).send(evaluation);
});

const getEvaluations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['rating', 'offer', 'collaborators']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await evaluationService.queryEvaluation(filter, options);
  res.send(result);
});

const getEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.getEvaluationById(req.params.evaluationId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  res.send(evaluation);
});

const updateEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.updateEvaluationById(req.params.evaluationId, req.body);
  res.send(evaluation);
});

const deleteEvaluation = catchAsync(async (req, res) => {
  await evaluationService.deleteEvaluationById(req.params.evaluationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const evaluateTender = catchAsync(async (req, res) => {
  const {tenderId} = req.params;
  const {ratings, comments, analysis} = req.body;

  const updatedEvaluation = await evaluationService.updateEvaluation(tenderId, {
    ratings,
    comments,
    analysis,
  });
  const contract = await contractService.generateContract(evaluationResults);


  await notificationService.sendNotification(successfulBidders, contract);

  res.status(httpStatus.OK).json({
    message: 'Evaluation completed successfully',
    contract: contract,
  });
});

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
  evaluateTender,
};
