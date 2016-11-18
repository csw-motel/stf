var _s = require('underscore.string')

module.exports = function PerformanceServiceFactory(socket) {
  var performanceData = []

  function enhanceEntry(data) {
    var date = new Date(data.date * 1000)
    data.dateLabel =
      _s.pad(date.getHours(), 2, '0') + ':' +
      _s.pad(date.getMinutes(), 2, '0') + ':' +
      _s.pad(date.getSeconds(), 2, '0') + '.' +
      _s.pad(date.getMilliseconds(), 3, '0')


    return data
  }

  socket.on('device.performance', function(message) {
    //  performanceData.push(message.serial)
    var values = []
      //performanceData.pop()
      //  performanceData.pop()
    values.push(message.date)
      /*  for (var key in Object.keys(message.load)) {
          performanceData.push(message.load[key].value)
        }*/
    values.push(message.load[0].value)
    values.push(message.load[1].value)
    performanceData.push(values)
  })

  return performanceData

}
