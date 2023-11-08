const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const statService = require("../services/stat.service");

const getStats = catchAsync(async(req,res) => {
  const stats = await statService.getStats();

  res.send(stats);

});

const getChartData = catchAsync(async(req,res)=>{
  console.log(req.query);
  const chartData = await statService.getChartData(req.query.dateFrom, req.query.dateTo);
  res.send(chartData);
})
module.exports = {
  getStats,
  getChartData
}
