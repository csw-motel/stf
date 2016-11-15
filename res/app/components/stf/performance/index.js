module.exports = angular.module('stf.performance', [
    require('stf/filter-string').name,
    require('stf/socket').name
  ])
  .factory('PerformanceService', require('./performance-service'))
