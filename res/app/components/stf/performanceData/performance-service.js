module.exports = function PerformanceServiceFactory(socket, ControlService) {

  var cpuData = {}
  var memoryData = {}
  var memTotal = {}

  socket.on('device.cpuPerformance', function(message) {

    if (cpuData.hasOwnProperty(message.serial)) {
      var json1 = {}
      json1['date'] = message.date
      for (var key in Object.keys(message.load)) {
        json1[message.load[key].cpu] = message.load[key].value
      }
      cpuData[message.serial].push(json1)

    } else {
      cpuData[message.serial] = []

      var json = {}
      json['date'] = message.date
      for (var key in Object.keys(message.load)) {
        json[message.load[key].cpu] = message.load[key].value
      }
      cpuData[message.serial].push(json)
    }

  })

  socket.on('device.memoryPerformance', function(message) {

    if (memoryData.hasOwnProperty(message.serial)) {
      var json1 = {
        'date': message.date,
        'Memory used': (message.load[0].value - message.load[1].value) / 1024
      }
      memoryData[message.serial].push(json1)

    } else {

      memTotal[message.serial] = ([message.load[0].value / 1024])
      memoryData[message.serial] = []
      var json = {
        'date': message.date,
        'Memory used': (message.load[0].value - message.load[1].value) / 1024
      }
      memoryData[message.serial].push(json)

    }

  })

  var startPerformance = function() {
    //  ControlService.startPerformance()
  }

  var stopPerformance = function(serial) {
    //ControlService.stopPerformance()
    delete cpuData[serial]
    delete memoryData[serial]
    delete memTotal[serial]
  }

  return {
    getCpuData: cpuData,
    startPerformance: startPerformance,
    stopPerformance: stopPerformance,
    getMemoryData: memoryData,
    getMemTotal: memTotal,
  }
}
