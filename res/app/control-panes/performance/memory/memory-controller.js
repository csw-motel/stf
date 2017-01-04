module.exports = function MemoryCtrl($scope, PerformanceService) {

  var d3 = require('d3')

  var commons = require('./../commons.js')
  var width = 400 - commons.margin.left - commons.margin.right
  var height = 250 - commons.margin.top - commons.margin.bottom

  commons.x.range([0, width])

  // function for the x grid lines
  function make_x_axis() {
    return d3.svg.axis()
      .scale(commons.x)
      .orient('bottom')
      .ticks(5)
  }

  // function for the y grid lines
  function make_y_axis() {
    return d3.svg.axis()
      .scale(commons.y)
      .orient('left')
      .ticks(5)
  }
  var area = d3.svg.area()
    .x(function(d) {
      return commons.x(d.date)
    })
    .y0(height)
    .y1(function(d) {
      return commons.y(d.value)
    })

  var memoryChart = d3.select('#memory svg')

  memoryChart = d3.select('#memory').append('svg')
    .attr('width', width + commons.margin.left + commons.margin.right)
    .attr('height', height + commons.margin.top + commons.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + commons.margin.left + ',' + commons.margin
      .top +
      ')')

  // Draw the y Grid lines
  memoryChart.append('g')
    .attr('class', 'grid')
    .call(make_y_axis()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  commons.y.range([height, 0]).domain([0, PerformanceService.getMemTotal])

  var y_axis = memoryChart.append('g')
    .attr('class', 'y axis')
    .call(commons.yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    //Create Y axis label
  memoryChart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - commons.margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('MB')

  var color = d3.scale.ordinal().range(['#b0c4de'])



  var x_axis = memoryChart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(commons.xAxis)


  var draw = function() {
    var memoryData = PerformanceService.getMemoryData
    commons.x.domain(d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000)
    }))

    x_axis.call(commons.xAxis)
    color.domain(d3.keys(memoryData[0]).filter(function(key) {
      return key !== 'date'
    }))

    var memorys = color.domain().map(function(name) {
      return {
        name: name,
        values: memoryData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: +d[name]
          }
        })
      }
    })


    var legend = memoryChart.selectAll('.g')
      .data(memorys)
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

    var memory = memoryChart.selectAll('.memory')
      .data(memorys)
      .enter().append('g')
      .attr('class', 'memory')
      .call(d3.behavior.zoom().scaleExtent([0.15, 12]).on("zoom", function() {
        x_axis.call(xAxis);
        memory.attr("transform", "translate(" + d3.event.translate +
          ")" +
          " scale(" + d3.event.scale + ")")
      }))

    var path = memory.append('path')
      .attr('class', 'area')
      .attr('d', function(d) {
        return area(d.values)
      })
      .style('stroke', function(d) {
        return color(d.name)
      })
  }
  draw()
    //setInterval(update, commons.interval)


}
