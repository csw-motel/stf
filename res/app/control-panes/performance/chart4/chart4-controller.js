module.exports = function Chart3Ctrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {
    /*
        function Chart() {
          this.exec = function(event) {};
        };
        with(Chart) {
          Chart.t = -1;
          Chart.v = 0;
          Chart.max_y = 100;
          Chart.automode = true;
          Chart.limit = 20;
          Chart.max_zoom = 10;
          Chart.duration = 1000;
          Chart.now = new Date(Date.now() - duration);
          Chart.width = document.getElementById('chart').clientWidth;
          Chart.height = document.getElementById('chart').clientHeight;
          console.log(Chart.width + " " + Chart.height);
          Chart.margins = {
            top: 10,
            right: 0,
            bottom: 50,
            left: 80
          };
          Chart.values = d3.range(limit).map(next);

          function next() {
            return {

              time: ++t,
              value: v = Math.floor(Math.random() * 20)
            };
          }

          Chart.domain_indices = {
            start_index_x: 0,
            end_index_x: 20,
            start_index_y: 0,
            end_index_y: 20
          };
          Chart.x = d3.scale.linear()
            .domain([domain_indices.start_index_x, domain_indices.end_index_x])
            .range([margins.left, width]);
          Chart.y = d3.scale
            .linear()
            .domain([domain_indices.start_index_y, domain_indices.end_index_y])
            .range([height - margins.bottom - margins.top, margins.top]);

          Chart.xAxis = d3.svg
            .axis()
            .scale(x);
          Chart.yAxis = d3.svg
            .axis()
            .scale(y)
            .orient('left');
          Chart.line = d3.svg
            .line()
            .interpolate('linear')
            .x(function(d, i) {

              return x(d.time);
            })
            .y(function(d, i) {
              return y(d.value);
            });

          Chart.svg = d3
            .select('#chart')

          svg.append('defs')
            .append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('transform', 'translate(' + margins.left + ', 0)');

          Chart.backRect = svg.append('rect')
            .style('stroke', 'none')
            .style('fill', '#FFF')
            .style('fill-opacity', 0)
            .attr({
              x: margins.left,
              y: margins.top,
              width: width - margins.right - margins.left,
              height: height - margins.top - margins.bottom,
              'pointer-events': 'all'
            });

          Chart.axis_x = svg
            .append('g')
            .style({
              'stroke': 'Black',
              'fill': 'none',
              'stroke-width': '1px'
            })
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - margins.bottom) +
              ')')
            .call(xAxis);
          Chart.axis_y = svg
            .append('g')
            .style({
              'stroke': 'Black',
              'fill': 'none',
              'stroke-width': '1px'
            })
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top +
              ')')
            .call(yAxis);
          Chart.paths = svg
            .append('g')
            .attr('clip-path', 'url(#clip)')
            .attr('transform', 'translate(0,' + margins.top + ')');
          Chart.path = paths
            .append('path')
            .data([values.slice(values.length - limit)])
            .style({
              'stroke': 'blue'
            });

          Chart.zoom = d3.behavior.zoom()
            .scaleExtent([0.15, 12])
            .x(x)
            //.y(y)
            .on('zoom', function zoomHandler() {
              axis_x.call(xAxis);
              // domain_indices.start_index_x -= d3.event.translate[0];
              // domain_indices.end_index_x -= d3.event.translate[0];
              // x.domain([domain_indices.start_index_x, domain_indices.end_index_x]);
              // axis_x.transition()
              //     .duration(0)
              //     .ease('linear')
              //     .call(xAxis);

              paths.attr('transform', 'translate(' + d3.event.translate[0] +
                ', ' + margins.top + ') ' + 'scale(' + d3.event.scale +
                ',1)');
              //paths.attr('transform', 'translate(0, ' + margins.top + ') ' + 'scale(' + d3.event.scale + ',1)');

            });
          // Chart.offsetX = 0;
          // Chart.drag = d3.behavior.drag()
          //     .on("dragstart", function() {
          //         offsetX = d3.transform(paths.attr("transform")).translate[0];
          //     })
          //     .on("drag", function(d, i) {
          //         offsetX += d3.event.dx;
          //         // domain_indices.start_index_x -= d3.event.dx;
          //         // domain_indices.end_index_x -= d3.event.dx;
          //         // x.domain([domain_indices.start_index_x, domain_indices.end_index_x]);
          //         // axis_x.transition()
          //         //     .duration(0)
          //         //     .ease('linear')
          //         //     .call(xAxis);
          //         paths.attr('transform', 'translate(' + offsetX + ',' + margins.top + ') ');
          //     })
          //     .on("dragend", function() {
          //     });
          backRect.call(zoom).on("dblclick.zoom", null);
          //backRect.call(drag);

          function Add() {
            values.push(Math.random() * 100);
          }
          Add();
          setInterval(Add, duration);
        }



        // реализации Chart

        // 1) режим автообновления
        function ChartAutoMode() {
          this.exec = function(event) {
            console.log("включен режим автообновления");
            Chart.automode = true;
            Chart.zoom.translate([0, 0]).scale(1);
            Chart.paths
              .attr('transform', 'translate(0, ' + Chart.margins.top +
                ')scale(1, 1)');
            Tick();

            function Tick() {
              with(Chart) {
                sump.translate_position_x = d3.transform(path.attr(
                  "transform")).translate[0];
                if (!automode) {
                  return;
                }
                now = new Date();
                path.data([values.slice(values.length - limit)])
                  .attr('d', line);

                domain_indices.start_index_x = now - (limit - 2) * duration;
                domain_indices.end_index_x = now - duration;
                x.domain([domain_indices.start_index_x, domain_indices.end_index_x]);

                axis_x.transition()
                  .duration(duration)
                  .ease('linear')
                  .call(xAxis);

                path
                  .attr('transform', null)
                  .transition()
                  .duration(duration)
                  .ease('linear')
                  .attr('transform', 'translate(' + (x(now - (limit - 1) *
                    duration) - margins.left) + ', 0)scale(1, 1)')
                  .each('end', Tick);

                var old_max_y = max_y;
                max_y = d3.max(values, function(d) {
                  return d;
                });
                if (old_max_y < max_y) {
                  y.domain([0, max_y]);
                  axis_y.transition()
                    .duration(0)
                    .ease("linear")
                    .call(yAxis);
                }
              }
            }
          };
        };
        ChartAutoMode.prototype = new Chart();
        ChartAutoMode.prototype.constructor = ChartAutoMode;



        // 2) режим пользователя
        function ChartUserMode() {
          this.exec = function(event) {
            if (Chart.automode) {
              console.log("включен режим пользователя");
              Chart.automode = false;
            }
          };
        };
        ChartUserMode.prototype = new Chart();
        ChartUserMode.prototype.constructor = ChartUserMode;


        // 2.1) режим пользователя: pan графика
        function ChartUserModePan() {
          var self = this;
          // this.old_page_x = 0;
          // this.old_page_y = 0;
          // this.translate_position_x = 0;
          // this.translate_position_y = 0;
          // // this.SPEED_X = 61;
          // // this.SPEED_Y = -Chart.height * 0.0001401;
          // this.SPEED_X = 28.5;
          // this.SPEED_Y = -0.123456789;
          this.exec = function(event) {
            ChartUserModePan.prototype.exec(event);

            // var delta_x_temp = self.old_page_x - event.pageX;
            // var delta_x = delta_x_temp * self.SPEED_X;
            // self.translate_position_x -= delta_x_temp;

            // var delta_y_temp = self.old_page_y - event.pageY;
            // var delta_y = delta_y_temp * self.SPEED_Y;
            // self.translate_position_y -= delta_y_temp;

            // with (Chart) {
            //     domain_indices.start_index_x += delta_x;
            //     domain_indices.end_index_x += delta_x;
            //     x.domain([domain_indices.start_index_x, domain_indices.end_index_x]);
            //     axis_x.transition()
            //         .duration(0)
            //         .ease('linear')
            //         .call(xAxis);

            //     domain_indices.start_index_y += delta_y;
            //     domain_indices.end_index_y += delta_y;
            //     y.domain([domain_indices.start_index_y, domain_indices.end_index_y]);
            //     axis_y.transition()
            //         .duration(0)
            //         .ease('linear')
            //         .call(yAxis);

            //     path.attr('transform', null)
            //         .transition()
            //         .duration(0)
            //         .ease('linear')
            //         .attr('transform', 'translate(' + (self.translate_position_x) + ',' + self.translate_position_y + ')');
            // }
            // self.old_page_x = event.pageX;
            // self.old_page_y = event.pageY;
          };
        };
        ChartUserModePan.prototype = new ChartUserMode();
        ChartUserModePan.prototype.constructor = ChartUserModePan;


        // 2.2) режим пользователя: zoom графика по оси Х
        function ChartUserModeZoomX() {
          this.exec = function(event) {
            ChartUserModeZoomX.prototype.exec(event);
          };
        };
        ChartUserModeZoomX.prototype = new ChartUserMode();
        ChartUserModeZoomX.prototype.constructor = ChartUserModeZoomX;


        // 2.3) режим пользователя: zoom графика по осям X и Y
        function ChartUserModeZoomXY() {
          this.exec = function(event) {
            ChartUserModeZoomXY.prototype.exec(event);
          };
        };
        ChartUserModeZoomXY.prototype = new ChartUserMode();
        ChartUserModeZoomXY.prototype.constructor = ChartUserModeZoomXY;

        // Context

        function Context(Chart) {

          this.exec = function(event) {
            Chart.exec(event);
          };

        }
        //Context.timerID = null;

        var sam = new ChartAutoMode();
        var sump = new ChartUserModePan();
        var sumzx = new ChartUserModeZoomX();
        var sumzxy = new ChartUserModeZoomXY();

        var inAutoMode = new Context(sam);
        var inUserModePan = new Context(sump);
        var inUserModeZoomX = new Context(sumzx);
        var inUserModeZoomXY = new Context(sumzxy);

        inAutoMode.exec(null);

        document.getElementById('chart').addEventListener('mousedown',
          function(event) {
            with(Chart) {
              automode = false;
              sump.old_page_x = event.pageX;
              sump.old_page_y = event.pageY;
            }
          });
        document.getElementById('chart').addEventListener('mouseup',
          function(event) {

          });
        document.getElementById('chart').addEventListener('mousemove',
          function(event) {
            if (event.which === 1) {
              inUserModePan.exec(event);
            }
          });
        document.getElementById('chart').addEventListener('wheel',
          function(event) {
            inUserModeZoomX.exec(event);
          });
        document.getElementById('chart').addEventListener('dblclick',
          function(event) {
            sump.translate_position_x = 0;
            inAutoMode.exec(event);
          });
    */

  }
}
