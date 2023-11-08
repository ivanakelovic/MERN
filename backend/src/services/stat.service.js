const httpStatus = require('http-status');
const {Tender} = require('../models');
const {Offer} = require('../models');
const offerService = require("../services/offer.service");
const tenderService = require("../services/tender.service");

const getStats = async () => {
  const activeTenders = await tenderService.getActiveCount();
  const successfulTenders = await tenderService.getSuccessfulTenderCount();
  const failedTenders = await tenderService.getFailedTendersCount();
  const offers = await offerService.getCount();

  return {
    "activeTenders": activeTenders,
    "successfulTenders": successfulTenders,
    "failedTenders": failedTenders,
    "offers": offers
  };
}

const getChartData = async (dateFrom, dateTo) => {
  const collection = await tenderService.getChartData(dateFrom, dateTo);
  return {"result": collection};
}

module.exports = {
  getStats,
  getChartData,
}
