module.exports = function MemoryCtrl($scope, PerformanceService) {

  var d3 = require('d3')

  var update = function() {
    var performanceData = PerformanceService.getMemoryData
    var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50
      },
      width = parseInt(d3.select("#memory").style("width")) - margin.left -
      margin.right,
      //  width = 400 - margin.left - margin.right,
      height = parseInt(d3.select("#memory").style("height")) - margin.top -
      margin.bottom
      //height = 300 - margin.top - margin.bottom

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

    var svg = d3.select('#memory svg')

    d3.selectAll('#memory svg').remove()

    svg = d3.select("#memory").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +
        ")")


    x.domain(d3.extent(performanceData, function(d) {
      return new Date(d.date * 1000);
    }));


    y.domain([0, 2000])

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

    var color = d3.scale.ordinal().range(["#b0c4de"])


    color.domain(d3.keys(performanceData[0]).filter(function(key) {
      return key !== "date";
    }));

    var memorys = color.domain().map(function(name) {
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

  }
  setInterval(update, 1000)
    //  d3.timer(update, 1000)

}
