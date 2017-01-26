module.exports = function MemoryCtrl($scope, PerformanceService) {

<<<<<<< HEAD
  var d3 = require('d3')

  var update = function() {
    var memoryData = PerformanceService.getMemoryData
    var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50
      },
      width = parseInt(d3.select("#memory").style("width")) - margin.left -
      margin.right,
      height = parseInt(d3.select("#memory").style("height")) - margin.top -
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

    // function for the x grid lines
    function make_x_axis() {
      return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
    }
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

>>>>>>> motel-0.2

    // function for the y grid lines
    function make_y_axis() {
      return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
    }
    var area = d3.svg.area()
      .x(function(d) {
        return x(d.date);
      })
      .y0(height)
      .y1(function(d) {
        return y(d.value);
      });

    var line = d3.svg.line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(d.value)
      })
      .interpolate("basis")

    var svg = d3.select('#memory svg')

    d3.selectAll('#memory svg').remove()

    svg = d3.select("#memory").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +
        ")")

    // Draw the x Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat("")
      )

    // Draw the y Grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
      )

<<<<<<< HEAD
    x.domain(d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000);
    }));
=======
  var y_axis = memoryChart.append('g')
    .attr('class', 'y axis')
    .call(yAxis.ticks(6))
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
>>>>>>> motel-0.2


    y.domain([0, PerformanceService.getMemTotal])

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
      //Create Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("MB");

    var color = d3.scale.ordinal().range(["#b0c4de"])


    color.domain(d3.keys(memoryData[0]).filter(function(key) {
      return key !== "date";
    }));

    var memorys = color.domain().map(function(name) {
      return {
        name: name,
        values: memoryData.map(function(d) {
          return {
            date: new Date(d.date * 1000),
            value: +d[name]
          };
        })
      };
    });

    var legend = svg.selectAll('.g')
      .data(memorys)
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

    var memory = svg.selectAll(".memory")
      .data(memorys)
      .enter().append("g")
      .attr("class", "memory")

    memory.append("path")
      .attr("class", "area")
      .attr("d", function(d) {
        return area(d.values)
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
    x.domain(commons.d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000)
    }))
    x.range([0, width])

    xAxis.scale(x)
    x_axis.call(xAxis)



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


  function resize() {
    // update width
    width = parseInt(commons.d3.select('#memory').style('width'), 10)
    width = width - commons.margin.left - commons.margin.right

    // reset x range
    x.range([0, width])

    // update chart
    update()
  }
  drawMemory()
  var memInterval = setInterval(update, commons.interval)

  //resize
  jQuery(window).resize(resize)
  jQuery('.fa-pane-handle').mouseup(resize)

  $scope.$on('$destroy', function() {
    jQuery(window).off('resize', resize)
    jQuery('.fa-pane-handle').off('mouseup', resize)
    clearInterval(memInterval)
  })
>>>>>>> motel-0.2
}
