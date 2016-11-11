require('./chart6.css')

module.exports = angular.module('stf.chart6', [
    require('epoch').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/chart6/chart6.pug',
      require('./chart6.pug')
    )
  }])
  .controller('Chart6Ctrl', require('./chart6-controller'))
