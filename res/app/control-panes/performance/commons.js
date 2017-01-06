var d3 = require('d3')
var interval = 1000
var margin = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 50
}

/*var x = d3.time.scale()
var y = d3.scale.linear()

var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')

var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')

var line = d3.svg.line()
  .x(function(d) {
    return x(d.date)
  })
  .y(function(d) {
    return y(d.value)
  })
  .interpolate('basis')
*/
module.exports = {
  d3: d3,
  margin: margin
    /*x: x,
    y: y,
    xAxis: xAxis,
    yAxis: yAxis,
    line: line*/
}
