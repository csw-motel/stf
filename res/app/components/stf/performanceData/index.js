module.exports = angular.module('stf.performance', [
    require('stf/socket').name,
    require('stf/control').name
  ])
  .factory('PerformanceService', require('./performance-service'))
