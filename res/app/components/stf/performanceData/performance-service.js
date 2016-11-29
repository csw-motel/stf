module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var performanceData = []
  var size = []
  var moment = require('moment')
  socket.on('device.performance', function(message) {
    var values = []
      //    console.log(performanceData[0]);
    var timestamp = moment.unix(message.date);
    console.log(timestamp.format("HH:mm:ss"));
    //  values.push(timestamp.format("HH:mm:ss"))

    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      values.push(message.load[key].value)
        //console.log(key + ' ' + message.load[key].value)

    }
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
