module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var cpuData = []
  var memoryData = []

  socket.on('device.performance', function(message) {

    var str = ""

    for (var key in Object.keys(message.load)) {
      str += ", " + '"cpu ' + key + '" : ' + message.load[key].value
    }

    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    cpuData.push(JSON.parse(jsonStr))
  })

  socket.on('device.memoryPerformance', function(message) {

    var str = ""

    //for (var key in Object.keys(message.load)) {

    str += ', "Memory used" : ' + (message.load[0].value - message.load[1]
      .value) / 1024

    //  }

    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    memoryData.push(JSON.parse(jsonStr))
  })

  var startPerformance = function() {
    //  ControlService.startPerformance()
    performanceData = []
  }

  var stopPerformance = function() {
    //ControlService.stopPerformance()
    performanceData = []
    console.log(JSON.stringify(performanceData));
  }
  return {
    getPerformanceData: cpuData,
    startPerformance: startPerformance,
    stopPerformance: stopPerformance,
    getMemoryData: memoryData
  }


}
