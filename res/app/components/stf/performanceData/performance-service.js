module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var cpuData = []
  var memoryData = []
  var memTotal = []
  var newData = {}

  socket.on('device.cpuPerformance', function(message) {
    var str = ""
    for (var key in Object.keys(message.load)) {
      str += ", " + '"cpu ' + key + '" : ' + message.load[key].value
    }
    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    newData = JSON.parse(jsonStr)

    cpuData.push(JSON.parse(jsonStr))
  })

  socket.on('device.memoryPerformance', function(message) {
    var str = ""

    setMemTotal([message.load[0].value / 1024])
    str += ', "Memory used" : ' + (message.load[0].value - message.load[1]
      .value) / 1024
    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    memoryData.push(JSON.parse(jsonStr))
  })

  var startPerformance = function() {
    //  ControlService.startPerformance()
  }

  var stopPerformance = function() {
    //ControlService.stopPerformance()
    setCpuData([])
    setMemoryData([])
  }

  function setCpuData(values) {
    angular.copy(values, cpuData)
  }

  function setMemoryData(values) {
    angular.copy(values, memoryData)
  }

  function setMemTotal(value) {
    angular.copy(value, memTotal)
  }

  return {
    getCpuData: cpuData,
    startPerformance: startPerformance,
    stopPerformance: stopPerformance,
    getMemoryData: memoryData,
    getMemTotal: memTotal,
    getNewData: function() {
      return newData;
    }
  }
}
