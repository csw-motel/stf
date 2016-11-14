module.exports = function CpuCtrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {


    var t = -1;
    var n = 40;
    var v = 0;
    var data = d3.range(1).map(next);

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
      width = 400 - margin.left - margin.right,
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

    var zoom = d3.behavior.zoom()
      .x(x)
      //.y(y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    function zoomed() {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);
      path.attr('transform', 'translate(' + d3.event.translate[0] + ') ' +
        'scale(' + d3.event.scale + ',1)');

    }


    var svg = d3.select('#cpu svg');
    if (svg.empty()) {


      svg = d3.select("#cpu").append("svg")
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
          //  .duration(500)
          .ease("linear")
          .call(d3.svg.axis().scale(x).orient("bottom"));


      }
    }



    /*
        d3.select('#cpu')
          .selectAll("div")
          .data([4, 8, 15, 16, 23, 42])
          .enter()
          .append("div")
          .style("height", (d) => d + "px")
    */


    /*____________________


        var ctx = document.getElementById("myChart");
        var data = {
          labels: ["January", "February", "March", "April", "May", "June",
            "July"
          ],
          datasets: [{
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }]
        };

        var myChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    */


    /* ___________________________________________________
     var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
___________________________________-*/

  }
}
