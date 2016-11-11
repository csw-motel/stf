require('./memory.css')

module.exports = angular.module('stf.memory', [
    require('epoch').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('control-panes/performance/memory/memory.pug',
      require('./memory.pug')
    )
  }])
  .controller('MemoryCtrl', require('./memory-controller'))
