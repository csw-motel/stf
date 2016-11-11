require('./performance.css')

module.exports = angular.module('stf.performance', [
    require('./cpu').name,
    require('./memory').name,
    require('./chart3').name,
    require('./chart4').name,
    require('./chart5').name,
    require('./chart6').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/performance.pug',
      require('./performance.pug')
    )
  }])
  .controller('PerformanceCtrl', require('./performance-controller'))
