module.exports = function MemoryCtrl($scope, PerformanceService) {


  var commons = require('./../commons.js')

  var width = 400 - commons.margin.left - commons.margin.right
  var height = 250 - commons.margin.top - commons.margin.bottom

  var lastwidth = commons.d3.select('#memory').style('width')
  var x = commons.d3.time.scale()
  var y = commons.d3.scale.linear()

  var xAxis = commons.d3.svg.axis()
    .scale(x)
    .orient('bottom')

  var yAxis = commons.d3.svg.axis()
    .scale(y)
    .orient('left')

  var line = commons.d3.svg.line()
    .x(function(d) {
      return x(d.date)
    })
    .y(function(d) {
      return y(d.value)
    })
    .interpolate('basis')
  x.range([0, width])


  // function for the y grid lines
  /*  function make_y_axis() {
      return commons.d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(6)
    }*/

  var area = commons.d3.svg.area()
    .x(function(d) {
      return x(d.date)
    })
    .y0(height)
    .y1(function(d) {
      return y(d.value)
    })

  var memoryChart = commons.d3.select('#memory svg')

  memoryChart = commons.d3.select('#memory').append('svg')
    .attr('width', width + commons.margin.left + commons.margin.right)
    .attr('height', height + commons.margin.top + commons.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + commons.margin.left + ',' + commons.margin
      .top +
      ')')

  // Draw the y Grid lines
  /*  memoryChart.append('g')
      .attr('class', 'grid')
      .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )*/

  y.range([height, 0]).domain([0, PerformanceService.getMemTotal])

  var y_axis = memoryChart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
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

  var color = commons.d3.scale.ordinal().range(['#b0c4de'])



  var x_axis = memoryChart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  var memory, memoryData
  var drawMemory = function() {

    memoryData = PerformanceService.getMemoryData
    x.domain(commons.d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000)
    }))

    x_axis.call(xAxis)
    color.domain(commons.d3.keys(memoryData[0]).filter(function(key) {
      return key !== 'date'
    }))

    var memorys = color.domain().map(function(name) {
      return {
        name: name,
        values: memoryData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: Number(d[name])
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

    memory = memoryChart.selectAll('.memory')
      .data(memorys)
      .enter().append('g')
      .attr('class', 'memory')


    var path = memory.append('path')
      .attr('class', 'area')
      .attr('d', function(d) {
        return area(d.values)
      })
      .style('stroke', function(d) {
        return color(d.name)
      })
  }
  var update = function() {
    if (document.getElementById('memory')) {
      x.domain(commons.d3.extent(memoryData, function(d) {
        return new Date(d.date * 1000)
      }))

      x_axis.call(xAxis)
      color.domain(commons.d3.keys(memoryData[0]).filter(function(key) {
        return key !== 'date'
      }))

      var memorys = color.domain().map(function(name) {
        return {
          name: name,
          values: memoryData.map(function(d) {
            return {
              date: new Date(d.date * 1000),
              value: Number(d[name])
            }
          })
        }
      })
      memory.selectAll('path').remove()
      memory.data(memorys)
        .enter().append('g')
        .attr('class', 'memory')


      var path = memory.append('path')
        .attr('class', 'area')
        .attr('d', function(d) {
          return area(d.values)
        })
        .style('stroke', function(d) {
          return color(d.name)
        })
    }
  }

  function checkForChanges() {
    if (document.getElementById('memory')) {
      if (commons.d3.select('#memory').style('width') != lastwidth) {
        resize()
        lastwidth = commons.d3.select('#memory').style('width')
      }

      setTimeout(checkForChanges, 100)
    }
  }


  function resize() {
    // update width
    width = parseInt(commons.d3.select('#memory').style('width'), 10)
    width = width - commons.margin.left - commons.margin.right

    // reset x range
    x.range([0, width])

    // update chart
    update()
  }
  if (document.getElementById('memory')) {
    checkForChanges()
    drawMemory()
    setInterval(update, commons.interval)
  }


}
