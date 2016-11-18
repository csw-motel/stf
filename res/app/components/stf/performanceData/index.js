module.exports = angular.module('stf.performance', [
    //  require('stf/filter-string').name,
    require('stf/socket').name
  ])
  .service('PerformanceService', require('./performance-service'))
