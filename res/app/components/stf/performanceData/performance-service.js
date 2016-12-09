module.exports = function PerformanceServiceFactory(socket,
  ControlService) {
  var cpuData = []
  var memoryData = []
<<<<<<< HEAD
var memTotal=[]
  socket.on('device.performance', function(message) {
=======
  var memTotal = []

>>>>>>> stf_AA

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
<<<<<<< HEAD

    //for (var key in Object.keys(message.load)) {
memTotal.pop()
memTotal.push(message.load[0].value / 1024)
=======
    setMemTotal([message.load[0].value / 1024])
>>>>>>> stf_AA
    str += ', "Memory used" : ' + (message.load[0].value - message.load[1]
      .value) / 1024
    var jsonStr = '{ ' + '"date" : ' + '"' + message.date + '"' +
      str + ' }'

    memoryData.push(JSON.parse(jsonStr))
  })

  var startPerformance = function() {
    //  ControlService.startPerformance()
<<<<<<< HEAD

=======
>>>>>>> stf_AA
  }

  var stopPerformance = function() {
    //ControlService.stopPerformance()
<<<<<<< HEAD

=======
    setCpuData([])
    setMemoryData([])
>>>>>>> stf_AA
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
    getPerformanceData: cpuData,
    startPerformance: startPerformance,
    stopPerformance: stopPerformance,
    getMemoryData: memoryData,
    getMemTotal: memTotal
  }
}
