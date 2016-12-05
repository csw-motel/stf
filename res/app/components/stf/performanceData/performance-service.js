module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var performanceData = []

  socket.on('device.performance', function(message) {
    var values = []
    var str = ""
    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      str += ", " + '"cpu ' + key + '" : ' + message.load[key].value
    }

    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    performanceData.push(JSON.parse(jsonStr))
  })

  //  var startPerformance = function() {
  //  ControlService.startPerformance()
  //  }

  //  var stopPerformance = function() {
  //ControlService.stopPerformance()
  //  performanceData = []
  //  }
  return {
    getPerformanceData: performanceData,
    //    startPerformance: startPerformance
    //  stopPerformance: stopPerformance
  }


}
