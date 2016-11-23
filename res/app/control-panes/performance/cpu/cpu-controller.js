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
        height = 300 - margin.top - margin.bottom;


      var x = d3.time.scale()
        .range([0, width])

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var line = d3.svg.line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y(d.value);
        });
      var svg = d3.select('#cpu svg')

      d3.selectAll('#cpu svg').remove();


      svg = d3.select("#cpu").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +
          ")");

      var parseDate = d3.time.format("%H").parse;

      var data = performanceData.map(function(d) {
        return {
          date: d[0],
          value: d[1]
        };
      })

      var data2 = performanceData.map(function(d) {
        return {
          date: d[0],
          value: d[2]
        }
      })

      var data3 = performanceData.map(function(d) {
        return {
          date: d[0],
          value: d[3]
        }
      })

      x.domain(d3.extent(data, function(d) {
        return d.date
      }))

      y.domain([0, d3.max(performanceData, function(d) {
        return Math.max(d[1], d[2], d[3])
      })])

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


      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)

      svg.append("path")
        .datum(data2)
        .attr("class", "line2")
        .attr("d", line);

      /*  svg.append("path")
    .datum(data3)
    .attr("class", "line2")
    .attr("d", line);
*/

    }

    setInterval(update, 1000)


  }
}
