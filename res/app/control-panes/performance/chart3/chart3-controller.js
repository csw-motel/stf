module.exports = function Chart3Ctrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {
    /*var t = -1
    var n = 40
    var v = 0
    var data = performanceData.map(function(d) {
      return {
        date: d[0],
        close: d[1]
      };
    })

    function next(d) {
      return {

        time: ++t,
        value: v = d[1]
      }
    }


    var margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40
      },
      width = 400 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

    var x = d3.scale.linear()
      .domain([0, 20])
      .range([0, width])

    var y = d3.scale.linear()
      .domain([0, 20])
      .range([height, 0])

    var line = d3.svg.line()
      .x(function(d, i) {

        return x(d.time)
      })
      .y(function(d, i) {
        return y(d.value)
      })

    var zoom = d3.behavior.zoom()
      .x(x)
      //.y(y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed)

    function zoomed() {
      svg.select(".x.axis").call(xAxis)
      svg.select(".y.axis").call(yAxis)
      path.attr('transform', 'translate(' + d3.event.translate[0] +
        ') ' +
        'scale(' + d3.event.scale + ',1)');

    }

    var svg = d3.select('#chart3 svg')
    if (svg.empty()) {


      svg = d3.select("#chart3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +
          ")");

      var graph = g.append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .call(zoom);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var axis = graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var yAxis = d3.svg.axis().scale(y).orient("left");
      g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      var path = graph.append("g")
        .append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line);

      tick();

      function tick() {
        // push a new data point onto the back
        data.push(next());

        // update domain
        x.domain([0, t]);

        // redraw path, shift path left
        path
          .attr("d", line)
          .attr("transform", null)
          .transition()
          .duration(500)
          .ease("linear")
          .transition()
          .attr("transform", "translate(" + t - 1 + ")")
          .each("end", tick);

        // shift axis left
        axis
          .transition()
          .ease("linear")
          .call(d3.svg.axis().scale(x).orient("bottom"));


      }
    }*/
  }
}
