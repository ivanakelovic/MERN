const Joi = require('joi');

const getChartData = {
  query: Joi.object().keys({
    dateFrom: Joi.date(),
    dateTo: Joi.date()
  }),
};

module.exports = {
  getChartData
}
