module.exports = function PerformanceServiceFactory(socket) {
  var performanceData = []

  socket.on('device.performance', function(message) {
    var values = []

    values.push(message.date)
    for (var key in Object.keys(message.load)) {
      values.push(message.load[key].value)
    }

    performanceData.push(values)
  })

  return performanceData

}
