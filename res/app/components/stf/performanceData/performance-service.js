module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var performanceData = []
  var size = []

  var moment = require('moment')
  socket.on('device.performance', function(message) {
    var values = []

    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      values.push(message.load[key].value)
    }


    /*performanceData.push({
      "timestamp": message.date,
      "values": message.load
    });*/

    // TO DO - Improve this piece of code
    size.pop()
    size.push(message.load.length)
    performanceData.push(values)

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
    getSize: size
  }


}
