const httpStatus = require('http-status');
const {Company} = require('../models');
const ApiError = require('../utils/ApiError');

const createCompany = async (companyBody) => {
  return Company.create(companyBody);
};

const queryCompanies = async (filter, options) => {
  const companies = await Company.paginate(filter, options);
  return companies;
};

const getCompanyById = async (id) => {
  return Company.findById(id);
};

const updateCompanyById = async (companyId, updateBody) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

const deleteCompanyById = async (companyId) => {
  const company = await getCompanyById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  await company.remove();
  return company;
};

module.exports = {
  createCompany,
  getCompanyById,
  queryCompanies,
  updateCompanyById,
  deleteCompanyById
};
