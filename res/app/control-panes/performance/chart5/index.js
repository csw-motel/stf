require('./chart5.css')

module.exports = angular.module('stf.chart5', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/chart5/chart5.pug',
      require('./chart5.pug')
    )
  }])
  .controller('Chart5Ctrl', require('./chart5-controller'))
