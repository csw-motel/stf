require('chart.js')

module.exports = function CpuCtrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {

    /*
        var base = d3.select("#myChart");
        var chart = base.append("canvas")
          .attr("width", 400)
          .attr("height", 300);

        var context = chart.node().getContext("2d");
        var data = [1, 2, 13, 20, 23];

        var scale = d3.scale.linear()
          .range([10, 390])
          .domain([1, 23]);

        data.forEach(function(d, i) {
          context.beginPath();
          context.rect(scale(d), 150, 10, 10);
          context.fillStyle = "red";
          context.fill();
          context.closePath();
        });
        */


    d3.select('#cpu')
      .selectAll("div")
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append("div")
      .style("height", (d) => d + "px")



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
