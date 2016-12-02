module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var performanceData = []
  var size = []

  var moment = require('moment')
  socket.on('device.performance', function(message) {
    var values = []
    var str = ""
    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      //  values.push(message.load[key].value)
      str += ", " + '"cpu' + key + '" : ' + message.load[key].value
    }
    //console.log(str)
    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'
      //  console.log(JSON.parse(jsonStr))
    performanceData.push(JSON.parse(jsonStr))
      //console.log(JSON.stringify(performanceData))

    // TO DO - Improve this piece of code
    size.pop()
    size.push(message.load.length)
      //  performanceData.push(values)

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
