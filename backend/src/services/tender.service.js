const httpStatus = require('http-status');
const {Tender} = require('../models');
const ApiError = require('../utils/ApiError');
const {any} = require("joi");

/**
 * Create a Tender
 * @param {Object} tenderBody
 * @returns {Promise<Tender>}
 */
const createTender = async (tenderBody) => {
  return Tender.create(tenderBody);
};

/**
 * Query for tenders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTenders = async (filter, options) => {
  const tenders = await Tender.paginate(filter, options);
  return tenders;
};

/**
 * Get tender by id
 * @param {ObjectId} id
 * @returns {Promise<Tender>}
 */
const getTenderById = async (id) => {
  return Tender.findById(id);
};


/**
 * Update tender by id
 * @param {ObjectId} tenderId
 * @param {Object} updateBody
 * @returns {Promise<Tender>}
 */
const updateTenderById = async (tenderId, updateBody) => {
  const tender = await getTenderById(tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }

  Object.assign(tender, updateBody);
  await tender.save();
  return tender;
};

/**
 * Delete tender by id
 * @param {ObjectId} tenderId
 * @returns {Promise<Tender>}
 */
const deleteTenderById = async (tenderId) => {
  const tender = await getTenderById(tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }
  await tender.remove();
  return tender;
};

/*returns: count of tenders witout contract and the deadline has not passed*/
const getActiveCount = async () => {
  const populatedTenders = await Tender.find({
    deadline: {$gt: new Date()}
  })
    .populate("offers", ['id', 'offer', 'isSelected'])
    .exec();
  const filteredTenders = populatedTenders.filter((tender) =>
    tender.offers.every((offer) => offer.isSelected === false)
  );
  return filteredTenders.length;
}

/*returns: Count of tenders with contract*/
const getSuccessfulTenderCount = async () => {
  const populatedTenders = await Tender.find({})
    .populate("offers", ['id', 'offer', 'isSelected'])
    .exec();
  console.log(populatedTenders);
  console.log(populatedTenders[2]);
  const filteredTenders = populatedTenders.filter((tender) =>
    tender.offers.some((offer) => offer.isSelected === true)
  );

  return filteredTenders.length;
}

/*returns: count of tenders with passed deadline and witout a contract*/
const getFailedTendersCount = async () => {
  const populatedTenders = await Tender.find({
    deadline: {$lte: new Date()}
  })
    .populate("offers", ['id', 'offer', 'isSelected'])
    .exec();
  const filteredTenders = populatedTenders.filter((tender) =>
    tender.offers.every((offer) => offer.isSelected === false)
  );
  return filteredTenders.length;
}

const getChartData = async (dateFrom, dateTo) => {
  const currentYear = new Date().getFullYear();
  const pipeline = [];

  if (dateFrom || dateTo) {
    const matchStage = {
      $match: {
        createdAt: {
          $gte: dateFrom ? new Date(dateFrom) : new Date(`${currentYear}-01-01`),
          $lt: dateTo ? new Date(dateTo) : new Date(`${currentYear + 1}-01-01`),
        },
      },
    };
    pipeline.push(matchStage);
  }

  pipeline.push(
    {
      $group: {
        _id: {$dateToString: {format: "%Y-%m", date: "$createdAt"}},
        count: {$sum: 1},
      },
    },
    {
      $sort: {
        _id: 1,
      },
    }
  );

  const collection = await Tender.aggregate(pipeline);
  return collection;
};
module.exports = {
  createTender,
  queryTenders,
  getTenderById,
  updateTenderById,
  deleteTenderById,
  getActiveCount,
  getSuccessfulTenderCount,
  getChartData,
  getFailedTendersCount
};

