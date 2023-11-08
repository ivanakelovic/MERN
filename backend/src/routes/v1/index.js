const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const offerRoute = require('./offer.route');
const evaluationRoute = require('./evaluation.route');
const companyRoute = require('./company.route');
const fileRoute = require('./file.route');
const tenderRoute = require('./tender.route');
const fileContentRoute=require('./fileContent.route');
const statsRoute = require("./stat.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/offers',
    route: offerRoute,
  },
  {
    path: '/evaluators',
    route: evaluationRoute,
  },
  {
    path: '/tenders',
    route: tenderRoute,
  },
  {
    path: '/companies',
    route: companyRoute
  },
  {
    path: '/uploads',
    route: fileRoute
  },
  {
    path: '/stats',
    route: statsRoute
  },
  {
    path:'/fileContent',
    route:fileContentRoute
  }

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
