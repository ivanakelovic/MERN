const allRoles = {
  user: [],
  admin: [
    'getUsers', 'manageUsers',
    'getTenders', 'manageTenders',
    'getOffers', 'manageOffers',
    'getCompanies', 'manageCompanies',
    'getFiles', 'manageFiles',
    'getEvaluator', 'manageEvaluator', "getStats"],
  vendor: ['getOffers', 'manageOffers'
    , 'getTenders', 'manageTenders',
    'getCompanies', 'manageCompanies',
    'getFiles', 'manageFiles', "getStats"
  ],


};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
