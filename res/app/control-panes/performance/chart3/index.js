require('./chart3.css')

module.exports = angular.module('stf.chart3', [
    require('epoch').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/chart3/chart3.pug',
      require('./chart3.pug')
    )
  }])
  .controller('Chart3Ctrl', require('./chart3-controller'))
