module.exports = function MemoryCtrl($scope, PerformanceService) {

  var d3 = require('d3')

<<<<<<< HEAD
=======

>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
  var margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 50
    },
    width = 500 - margin.left -
    margin.right,
    height = 250 - margin.top -
    margin.bottom

  var x = d3.time.scale()
    .range([0, width])

  var y = d3.scale.linear()
    .range([height, 0])

  var xAxis = d3.svg.axis()
    .scale(x)
<<<<<<< HEAD
    .orient('bottom')

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
=======
    .orient("bottom")

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4

  // function for the x grid lines
  function make_x_axis() {
    return d3.svg.axis()
      .scale(x)
<<<<<<< HEAD
      .orient('bottom')
=======
      .orient("bottom")
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
      .ticks(5)
  }

  // function for the y grid lines
  function make_y_axis() {
    return d3.svg.axis()
      .scale(y)
<<<<<<< HEAD
      .orient('left')
=======
      .orient("left")
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
      .ticks(5)
  }
  var area = d3.svg.area()
    .x(function(d) {
<<<<<<< HEAD
      return x(d.date)
    })
    .y0(height)
    .y1(function(d) {
      return y(d.value)
    })
=======
      return x(d.date);
    })
    .y0(height)
    .y1(function(d) {
      return y(d.value);
    });
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date)
    })
    .y(function(d) {
      return y(d.value)
    })
<<<<<<< HEAD
    .interpolate('basis')

  var svg = d3.select('#memory svg')

  svg = d3.select('#memory').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top +
      ')')

  // Draw the x Grid lines
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + height + ')')
    .call(make_x_axis()
      .tickSize(-height, 0, 0)
      .tickFormat('')
    )

  // Draw the y Grid lines
  svg.append('g')
    .attr('class', 'grid')
    .call(make_y_axis()
      .tickSize(-width, 0, 0)
      .tickFormat('')
=======
    .interpolate("basis")

  var svg = d3.select('#memory svg')

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
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
    )

  y.domain([0, PerformanceService.getMemTotal])

<<<<<<< HEAD
  var y_axis = svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    //Create Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('MB')

  var color = d3.scale.ordinal().range(['#b0c4de'])
=======
  var y_axis = svg.append("g")
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
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4

  var legend = svg.selectAll('.g')
    //.data(memorys)
    //.enter()
    //.append('g')
<<<<<<< HEAD
    //  .attr('class', 'legend')
  legend.append('rect')
    .attr('y', height + 30)
    .attr('x', function(d, i) {
      return i * 45
=======
    //  .attr('class', 'legend');
  legend.append('rect')
    .attr('y', height + 30)
    .attr('x', function(d, i) {
      return i * 45;
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
    })
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', function(d) {
<<<<<<< HEAD
      return color(d.name)
    })
=======
      return color(d.name);
    });
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4

  legend.append('text')
    .attr('y', height + 40)
    .attr('x', function(d, i) {
<<<<<<< HEAD
      return (i * 45) + 15
    })
    .text(function(d) {
      return d.name
    })

  var x_axis = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)


  var update = function() {
    var memoryData = PerformanceService.getMemoryData
    console.log(JSON.stringify(memoryData))
    x.domain(d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000)
    }))
=======
      return (i * 45) + 15;
    })
    .text(function(d) {
      return d.name;
    });

  var x_axis = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)



  var update = function() {
    var memoryData = PerformanceService.getMemoryData

    x.domain(d3.extent(memoryData, function(d) {
      return new Date(d.date * 1000);
    }));
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4

    x_axis.call(xAxis)
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
<<<<<<< HEAD
      }
    })

    var memory = svg.selectAll('.memory')
=======
      };
    });

    var memory = svg.selectAll(".memory")
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
      .data(memorys)
      .enter().append('g')
      .attr('class', 'memory')

<<<<<<< HEAD
    var path = memory.append('path')
      .attr('class', 'area')
      .attr('d', function(d) {
=======

    var path = memory.append("path")
      .attr("class", "area")
      .attr("d", function(d) {
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
        return area(d.values)
      })
      .style('stroke', function(d) {
        return color(d.name)
      })
<<<<<<< HEAD
=======
      .call(d3.behavior.zoom().scaleExtent([0.15, 12])
        .x(x).on("zoom", function() {
          x_axis.call(xAxis);
          memory.attr("transform", "translate(" + d3.event.translate +
            ")" +
            " scale(" + d3.event.scale + ")")
        }))
>>>>>>> c3f647e506c71245cb446c03eb9f10c265917ae4
  }

  setInterval(update, 1000)


}
