require('./chart4.css')

module.exports = angular.module('stf.chart4', [
    require('epoch').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/chart4/chart4.pug',
      require('./chart4.pug')
    )
  }])
  .controller('Chart4Ctrl', require('./chart4-controller'))
