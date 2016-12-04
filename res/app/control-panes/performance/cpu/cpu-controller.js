module.exports = function CpuCtrl($scope, PerformanceService) {

  $scope.chart = function() {
    var d3 = require('d3')

    var update = function() {

      var moment = require('moment')

      var performanceData = PerformanceService.getPerformanceData

      var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
        },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom

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

      var svg = d3.select('#cpu svg')

      d3.selectAll('#cpu svg').remove()

      svg = d3.select("#cpu").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +
          ")")

      var parseDate = d3.time.format("%H:%M:%S")
      var cpuline

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
        .style("text-anchor", "end")

      var color = d3.scale.ordinal().range(["#FF0000", "#FFFF00",
        "#2c7bb6", "#FF00FF"
      ]);


      color.domain(d3.keys(performanceData[0]).filter(function(key) {
        return key !== "date";
      }));

      var cpus = color.domain().map(function(name) {
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
        .attr('x', width - 20)
        .attr('y', function(d, i) {
          return i * 20;
        })
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', function(d) {
          return color(d.name);
        });

      legend.append('text')
        .attr('x', width - 8)
        .attr('y', function(d, i) {
          return (i * 20) + 9;
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

    }

    d3.timer(update, 1000)

  }
}
