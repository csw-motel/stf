require('chart.js')

module.exports = function Chart6Ctrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {
    /*  var t = -1;
      var n = 40;
      var v = 0;
      var data = d3.range(n).map(next);

      function next() {
        return {

          time: ++t,
          value: v = Math.floor(Math.random() * 20)
        };
      }

      var margin = {
          top: 10,
          right: 10,
          bottom: 20,
          left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
        .domain([0, 20])
        .range([0, width]);

      var y = d3.scale.linear()
        .domain([0, 20])
        .range([height, 0]);

      var line = d3.svg.line()
        .x(function(d, i) {

          return x(d.time);
        })
        .y(function(d, i) {
          return y(d.value);
        });
      //    d3.selectAll('#chart6 svg').remove();

      var svg = d3.select('#chart6 svg');
      if (svg.empty()) {


        svg = d3.select("#chart6").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top +
            ")");

        var graph = g.append("svg")
          .attr("width", width)
          .attr("height", height + margin.top + margin.bottom);

        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        var axis = graph.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        g.append("g")
          .attr("class", "y axis")
          .call(d3.svg.axis().scale(y).orient("left"));

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
            .attr("transform", "translate(" + t - 1 + ")")
            .each("end", tick);

          // shift axis left
          axis
            .transition()
            .duration(500)
            .ease("linear")
            .call(d3.svg.axis().scale(x).orient("bottom"));

          // pop the old data point off the front
          data.shift();
        }
      }
      */
  }
}
