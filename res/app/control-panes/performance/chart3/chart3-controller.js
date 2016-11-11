module.exports = function Chart3Ctrl($scope) {

  d3 = require('d3')

  $scope.chart = function() {

    function Strategy() {
      this.exec = function(event) {};
    };
    with(Strategy) {
      Strategy.automode = true;
      Strategy.max_y = 100;
      Strategy.limit = 50;
      Strategy.max_zoom = 10;
      Strategy.duration = 1000;
      Strategy.now = new Date(Date.now() - duration);
      Strategy.width = document.getElementById('visualisation').clientWidth;
      Strategy.height = document.getElementById('visualisation').clientHeight;
      console.log(Strategy.width + " " + Strategy.height);
      Strategy.margins = {
        top: 10,
        right: 0,
        bottom: 50,
        left: 80
      };
      Strategy.values = d3.range(limit).map(function() {
        return 0;
      });
      Strategy.domain_indices = {
        start_index_x: 0,
        end_index_x: now - duration,
        start_index_y: 0,
        end_index_y: max_y
      };
      Strategy.x = d3.time
        .scale()
        .domain([domain_indices.start_index_x, domain_indices.end_index_x])
        .range([margins.left, width]);
      Strategy.y = d3.scale
        .linear()
        .domain([domain_indices.start_index_y, domain_indices.end_index_y])
        .range([height - margins.bottom - margins.top, margins.top]);
      Strategy.xAxis = d3.svg
        .axis()
        .scale(x);
      Strategy.yAxis = d3.svg
        .axis()
        .scale(y)
        .orient('left');
      Strategy.line = d3.svg
        .line()
        .interpolate('linear')
        .x(function(d, i) {
          return x(now - (limit - 1 - i) * duration)
        })
        .y(function(d) {
          return y(d)
        });
      Strategy.svg = d3
        .select('#visualisation')

      svg.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('transform', 'translate(' + margins.left + ', 0)');

      Strategy.backRect = svg.append('rect')
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

      Strategy.axis_x = svg
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
      Strategy.axis_y = svg
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
      Strategy.paths = svg
        .append('g')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + margins.top + ')');
      Strategy.path = paths
        .append('path')
        .data([values.slice(values.length - limit)])
        .style({
          'stroke': 'blue'
        });

      Strategy.zoom = d3.behavior.zoom()
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
      // Strategy.offsetX = 0;
      // Strategy.drag = d3.behavior.drag()
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



    // реализации Strategy

    // 1) режим автообновления
    function StrategyAutoMode() {
      this.exec = function(event) {
        console.log("включен режим автообновления");
        Strategy.automode = true;
        Strategy.zoom.translate([0, 0]).scale(1);
        Strategy.paths
          .attr('transform', 'translate(0, ' + Strategy.margins.top +
            ')scale(1, 1)');
        Tick();

        function Tick() {
          with(Strategy) {
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
    StrategyAutoMode.prototype = new Strategy();
    StrategyAutoMode.prototype.constructor = StrategyAutoMode;



    // 2) режим пользователя
    function StrategyUserMode() {
      this.exec = function(event) {
        if (Strategy.automode) {
          console.log("включен режим пользователя");
          Strategy.automode = false;
        }
      };
    };
    StrategyUserMode.prototype = new Strategy();
    StrategyUserMode.prototype.constructor = StrategyUserMode;


    // 2.1) режим пользователя: pan графика
    function StrategyUserModePan() {
      var self = this;
      // this.old_page_x = 0;
      // this.old_page_y = 0;
      // this.translate_position_x = 0;
      // this.translate_position_y = 0;
      // // this.SPEED_X = 61;
      // // this.SPEED_Y = -Strategy.height * 0.0001401;
      // this.SPEED_X = 28.5;
      // this.SPEED_Y = -0.123456789;
      this.exec = function(event) {
        StrategyUserModePan.prototype.exec(event);

        // var delta_x_temp = self.old_page_x - event.pageX;
        // var delta_x = delta_x_temp * self.SPEED_X;
        // self.translate_position_x -= delta_x_temp;

        // var delta_y_temp = self.old_page_y - event.pageY;
        // var delta_y = delta_y_temp * self.SPEED_Y;
        // self.translate_position_y -= delta_y_temp;

        // with (Strategy) {
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
    StrategyUserModePan.prototype = new StrategyUserMode();
    StrategyUserModePan.prototype.constructor = StrategyUserModePan;


    // 2.2) режим пользователя: zoom графика по оси Х
    function StrategyUserModeZoomX() {
      this.exec = function(event) {
        StrategyUserModeZoomX.prototype.exec(event);
      };
    };
    StrategyUserModeZoomX.prototype = new StrategyUserMode();
    StrategyUserModeZoomX.prototype.constructor = StrategyUserModeZoomX;


    // 2.3) режим пользователя: zoom графика по осям X и Y
    function StrategyUserModeZoomXY() {
      this.exec = function(event) {
        StrategyUserModeZoomXY.prototype.exec(event);
      };
    };
    StrategyUserModeZoomXY.prototype = new StrategyUserMode();
    StrategyUserModeZoomXY.prototype.constructor = StrategyUserModeZoomXY;

    // Context

    function Context(strategy) {

      this.exec = function(event) {
        strategy.exec(event);
      };

    }
    //Context.timerID = null;

    var sam = new StrategyAutoMode();
    var sump = new StrategyUserModePan();
    var sumzx = new StrategyUserModeZoomX();
    var sumzxy = new StrategyUserModeZoomXY();

    var inAutoMode = new Context(sam);
    var inUserModePan = new Context(sump);
    var inUserModeZoomX = new Context(sumzx);
    var inUserModeZoomXY = new Context(sumzxy);

    inAutoMode.exec(null);

    document.getElementById('visualisation').addEventListener('mousedown',
      function(event) {
        with(Strategy) {
          automode = false;
          sump.old_page_x = event.pageX;
          sump.old_page_y = event.pageY;
        }
      });
    document.getElementById('visualisation').addEventListener('mouseup',
      function(event) {

      });
    document.getElementById('visualisation').addEventListener('mousemove',
      function(event) {
        if (event.which === 1) {
          inUserModePan.exec(event);
        }
      });
    document.getElementById('visualisation').addEventListener('wheel',
      function(event) {
        inUserModeZoomX.exec(event);
      });
    document.getElementById('visualisation').addEventListener('dblclick',
      function(event) {
        sump.translate_position_x = 0;
        inAutoMode.exec(event);
      });

  }
}
