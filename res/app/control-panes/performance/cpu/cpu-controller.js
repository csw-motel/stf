module.exports = function CpuCtrl($scope, PerformanceService) {

<<<<<<< HEAD
  var d3 = require('d3')

  var update = function() {
    var performanceData = PerformanceService.getPerformanceData

    var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50
      },
      width = parseInt(d3.select("#cpu").style("width")) - margin.left -
      margin.right,
      height = parseInt(d3.select("#cpu").style("height")) - margin.top -
      margin.bottom

    var x = d3.time.scale()
      .range([0, width])

    var y = d3.scale.linear()
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

    var line = d3.svg.line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(d.value)
      })
      .interpolate("basis")

    var svg = d3.select('#cpu svg')

    d3.selectAll('#cpu svg').remove()

    svg = d3.select("#cpu").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +
        ")")


    x.domain(d3.extent(performanceData, function(d) {
      return new Date(d.date * 1000);
    }));


    y.domain([0, 100])

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")


    var color = d3.scale.ordinal().range(["#33cc33",
      "#0099ff", "#ff9900", "#FF00FF", "#0D7AFF", "#6B238E",
      "#FF6600", "#33ff33"
    ])

    //Create Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("%");


    color.domain(d3.keys(performanceData[0]).filter(function(key) {
      return key !== "date";
    }));

    var cpus = color.domain().map(function(name) {
=======
  var commons = require('./../commons.js')
  var jQuery = require('jquery')

  var width = 400 - commons.margin.left - commons.margin.right
  var height = 250 - commons.margin.top - commons.margin.bottom

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

  var cpu, performanceData

  var cpuChart = commons.d3.select('#cpu').append('svg')
    .attr('id', 'cpuChart')
    .attr('width', width + commons.margin.left + commons.margin.right)
    .attr('height', height + commons.margin.top + commons.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + commons.margin.left + ',' + commons.margin.top + ')')

  y.range([height, 0]).domain([0, 100])

  var x_axis = cpuChart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  cpuChart.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')

  var color = commons.d3.scale.ordinal().range(['#33cc33', '#0099ff', '#ff9900', '#FF00FF',
    '#0D7AFF',
    '#6B238E', '#FF6600', '#33ff33'
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

    performanceData = PerformanceService.getCpuData
    x.range([0, width])

    x.domain(commons.d3.extent(performanceData, function(d) {
      return new Date(d.date * 1000)
    }))
    xAxis.scale(x)
    x_axis.call(xAxis)

    color.domain(commons.d3.keys(performanceData[0]).filter(function(key) {
      return key !== 'date'
    }))

    var cpuMap = color.domain().map(function(name) {
>>>>>>> motel-0.2
      return {
        name: name,
        values: performanceData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: +d[name]
          };
        })
      };
    });

    var legend = svg.selectAll('.g')
      .data(cpus)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('y', height + 30)
      .attr('x', function(d, i) {
        return i * 45;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('y', height + 40)
      .attr('x', function(d, i) {
        return (i * 45) + 15;
      })
      .text(function(d) {
        return d.name;
      });


    var cpu = svg.selectAll(".cpu")
      .data(cpus)
      .enter().append("g")
      .attr("class", "cpu")

    cpu.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values)
      })
      .style("stroke", function(d) {
        return color(d.name)
      })
<<<<<<< HEAD

  }
  setInterval(update, 1000)

=======

  }

  var update = function() {

    width = parseInt(commons.d3.select('#cpu').style('width'), 10)
    width = width - commons.margin.left - commons.margin.right

    x.domain(commons.d3.extent(performanceData, function(d) {
      return new Date(d.date * 1000)
    }))
    x.range([0, width])

    xAxis.scale(x)
    x_axis.call(xAxis)

    var cpuMap = color.domain().map(function(name) {
      return {
        name: name,
        values: performanceData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: Number(d[name])
          }
        })
      }
    })

    cpu.selectAll('path').remove()
    cpu.data(cpuMap)
      .enter().append('g')
      .attr('class', 'cpu')

    cpu.append('path')
      .attr('class', 'line')
      .attr('d', function(d) {
        return line(d.values)
      })
      .style('stroke', function(d) {
        return color(d.name)
      })
  }

  function resize() {
    // update width
    width = parseInt(commons.d3.select('#cpu').style('width'), 10)
    width = width - commons.margin.left - commons.margin.right

    // reset x range
    x.range([0, width])

    // update chart
    update()
  }

  draw()
  var interval = setInterval(update, commons.interval)

  //resize
  jQuery(window).resize(resize)
  jQuery('.fa-pane-handle').mouseup(resize)

  $scope.$on('$destroy', function() {
    jQuery(window).off('resize', resize)
    jQuery('.fa-pane-handle').off('mouseup', resize)
    clearInterval(interval)
  })


>>>>>>> motel-0.2
}
