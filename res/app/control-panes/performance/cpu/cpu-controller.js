module.exports = function CpuCtrl($scope, PerformanceService) {

  var d3 = require('d3')

  var commons = require('./../commons.js')


  var width = 400 - commons.margin.left -
    commons.margin.right
  var height = 250 - commons.margin.top -
    commons.margin.bottom

  commons.x.range([0, width])

  var cpuChart = d3.select('#cpu svg')

  cpuChart = d3.select('#cpu').append('svg')
    .attr('width', width + commons.margin.left + commons.margin.right)
    .attr('height', height + commons.margin.top + commons.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + commons.margin.left + ',' + commons.margin
      .top +
      ')')

  commons.y.range([height, 0]).domain([0, 100])

  var x_axis = cpuChart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(commons.xAxis)

  cpuChart.append('g')
    .attr('class', 'y axis')
    .call(commons.yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')

  var color = d3.scale.ordinal().range(['#33cc33',
    '#0099ff', '#ff9900', '#FF00FF', '#0D7AFF', '#6B238E',
    '#FF6600', '#33ff33'
  ])

  //Create Y axis label
  cpuChart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - commons.margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('%')

  var draw = function() {
    var performanceData = PerformanceService.getPerformanceData

    commons.x.domain(d3.extent(performanceData, function(d) {
      return new Date(d.date * 1000)
    }))

    x_axis.call(commons.xAxis)
    color.domain(d3.keys(performanceData[0]).filter(function(key) {
      return key !== 'date'
    }))

    var cpus = color.domain().map(function(name) {
      return {
        name: name,
        values: performanceData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: +d[name]
          }
        })
      }
    })

    var legend = cpuChart.selectAll('.g')
      .data(cpus)
      .enter()
      .append('g')
      .attr('class', 'legend')

    legend.append('rect')
      .attr('y', height + 30)
      .attr('x', function(d, i) {
        return i * 45
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name)
      })

    legend.append('text')
      .attr('y', height + 40)
      .attr('x', function(d, i) {
        return (i * 45) + 15
      })
      .text(function(d) {
        return d.name
      })

    var cpu = cpuChart.selectAll('.cpu')
      .data(cpus)
      .enter().append('g')
      .attr('class', 'cpu')

    cpu.append('path')
      .attr('class', 'line')
      .attr('d', function(d) {
        return commons.line(d.values)
      })
      .style('stroke', function(d) {
        return color(d.name)
      })

  }
  draw()

  //  setInterval(update, commons.interval)

}
