module.exports = function MemoryCtrl($scope, PerformanceService) {

  var d3 = require('d3')
    /*
      var chart = require('./../chart.js')
      var width = 400 - commons.margin.left -
        commons.margin.right
      var height = 250 - commons.margin.top -
        commons.margin.bottom

      commons.x.range([0, width])

        // function for the x grid lines
        function make_x_axis() {
          return d3.svg.axis()
            .scale(chart.x)
            .orient('bottom')
            .ticks(5)
        }

        // function for the y grid lines
        function make_y_axis() {
          return d3.svg.axis()
            .scale(chart.y)
            .orient('left')
            .ticks(5)
        }
        var area = d3.svg.area()
          .x(function(d) {
            return chart.x(d.date)
          })
          .y0(chart.height)
          .y1(function(d) {
            return chart.y(d.value)
          })

        var line = d3.svg.line()
          .x(function(d) {
            return chart.x(d.date)
          })
          .y(function(d) {
            return chart.y(d.value)
          })
          .interpolate('basis')

        var svg = d3.select('#memory svg')

        svg = d3.select('#memory').append('svg')
          .attr('width', chart.width + chart.margin.left + chart.margin.right)
          .attr('height', chart.height + chart.margin.top + chart.margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + chart.margin.left + ',' + chart.margin.top +
            ')')

        // Draw the x Grid lines
        svg.append('g')
          .attr('class', 'grid')
          .attr('transform', 'translate(0,' + chart.height + ')')
          .call(make_x_axis()
            .tickSize(-chart.height, 0, 0)
            .tickFormat('')
          )

        // Draw the y Grid lines
        svg.append('g')
          .attr('class', 'grid')
          .call(make_y_axis()
            .tickSize(-chart.width, 0, 0)
            .tickFormat('')
          )

        chart.y.range([height, 0]).domain([0, PerformanceService.getMemTotal])

        var y_axis = svg.append('g')
          .attr('class', 'y axis')
          .call(chart.yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          //Create Y axis label
        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 0 - chart.margin.left)
          .attr('x', 0 - (chart.height / 2))
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text('MB')

        var color = d3.scale.ordinal().range(['#b0c4de'])

        var legend = svg.selectAll('.g')
          //.data(memorys)
          //.enter()
          //.append('g')
          //  .attr('class', 'legend')
        legend.append('rect')
          .attr('y', chart.height + 30)
          .attr('x', function(d, i) {
            return i * 45
          })
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', function(d) {
            return color(d.name)
          })

        legend.append('text')
          .attr('y', chart.height + 40)
          .attr('x', function(d, i) {
            return (i * 45) + 15
          })
          .text(function(d) {
            return d.name
          })

        var x_axis = svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + chart.height + ')')
          .call(chart.xAxis)


        var update = function() {
          var memoryData = PerformanceService.getMemoryData
          chart.x.domain(d3.extent(memoryData, function(d) {
            return new Date(d.date * 1000)
          }))

          x_axis.call(chart.xAxis)
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

          var memory = svg.selectAll('.memory')
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

        setInterval(update, chart.interval)

      */
}
