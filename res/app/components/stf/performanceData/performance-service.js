module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var performanceData = []

  socket.on('device.performance', function(message) {
    var values = []

    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      values.push(message.load[key].value)
    }

    performanceData.push(values)
  })

  /*  var startPerformance = function() {
      ControlService.startPerformance()
    }*/

  return {
    getPerformanceData: performanceData,
    //  startPerformance: startPerformance
  }

}
