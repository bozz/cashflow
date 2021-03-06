define(function(require) {
  // var d3 = require('d3');
  var utils = require('utils');
  var tpl = require('text!/templates/bank_accounts/graph.jst.ejs');

  var BankAccountGraphView = Backbone.View.extend({

    template: _.template(tpl),

    events: {
      'submit form.form-inline': 'filterGraph'
    },

    initialize: function (config) {
      this.parentView = config.parentView;
      this.bankId = config.bankId;

      this.w = config.w || 200;
      this.h = config.h || 100;
      this.size = 200;
      this.duration = 500;

      // set initial dates for graph
      this.toDate = moment().format('YYYY-MM-DD');
      this.fromDate = moment().subtract('months', 2).format('YYYY-MM-DD');

      this.fetchData();
    },

    close: function() {
      this.remove();
      this.unbind();
    },

    // load graph data
    fetchData: function(fromDate, toDate) {
      if(!fromDate || !toDate) {
        toDate = this.toDate;
        fromDate = this.fromDate;
      }

      var self = this;
      this.$el.mask("Loading...");
      $.ajax({
        url: "/api/banks/" + this.bankId + "/balance_range",
        dataType: 'json',
        data: { from_date: fromDate, to_date: toDate },
        success: function(data, textStatus, xhr) {
          self.updateBalanceDisplay(data);
          self.renderPlot(data);
          self.$el.unmask();
        },
        error: function(xhr, textStatus, errorThrown) {
          var response = jQuery.parseJSON(xhr.responseText);
          utils.alertError("Error loading graph data: " + response.errorMsg);
          self.$el.unmask();
        }
      });
    },

    updateBalanceDisplay: function(data) {
      if(data.length < 2) { return false; }

      var initialBalance = data[0];
      var finalBalance = data[data.length-1];
      this.$el.find('span.initial-balance').html( initialBalance.amount + " " + initialBalance.currency );
      this.$el.find('span.final-balance').html( finalBalance.amount + " " + finalBalance.currency );
    },

    render: function () {
      var dateFormat = utils.localDateFormat.toUpperCase();
      var toDate   = moment(this.toDate).format(dateFormat);
      var fromDate = moment(this.fromDate).format(dateFormat);

      this.$el.html(this.template({toDate: toDate, fromDate: fromDate, dateFormat: utils.localDateFormat}));

      this.$el.find('div.date').datepicker({ weekStart: 1 });
      this.delegateEvents();
      return this;
    },

    redraw: function() {
      // transition the plot
      this.plot({
        newPlot: false
      });
    },

    // Draw the plot
    renderPlot: function(data) {
      if(data.length > 0) {
        $('div.graph', this.$el).html('');
        this.plot({
          newPlot: true,
          data: data
        });
      }
    },

    filterGraph: function(event) {
      event.preventDefault();

      var toDate   = this.$el.find('#dp3 input').val();
      var fromDate = this.$el.find('#dp4 input').val();

      var dateFormat = utils.localDateFormat.toUpperCase();
      this.toDate   = moment(toDate, dateFormat).format('YYYY-MM-DD');
      this.fromDate = moment(fromDate, dateFormat).format('YYYY-MM-DD');

      if(this.validateDates(this.toDate, this.fromDate)) {
        this.fetchData(this.toDate, this.fromDate);
      }
    },

    validateDates: function(fromDate, toDate) {
      var today = moment().format('YYYY-MM-DD');
      var errors = [];

      if(fromDate > today) {
        errors.push('The "From Date" cannot be in the future');
      }
      if(toDate > today) {
        errors.push('The "To Date" cannot be in the future');
      }
      if(fromDate > toDate) {
        errors.push('The "From Date" cannot be after the "To Date".');
      }

      if(errors.length > 0) {
        alert(errors.join('\n'));
        return false;
      }
      return true;
    },

    plot: function(options) {
      var data = options.data;

      var m = [80, 80, 80, 80],
      w = 960 - m[1] - m[3],
      h = 500 - m[0] - m[2],
      parse = d3.time.format("%Y-%m-%d").parse;

      // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
      var x = d3.time.scale().range([0, w]),
      y = d3.scale.linear().range([h, 0]),
      // xAxis = d3.svg.axis().scale(x).tickSize(-h, 0).tickPadding(6),
      xAxis = d3.svg.axis().scale(x).ticks(8); //tickSize(6).tickSubdivide(1),
      yAxis = d3.svg.axis().scale(y).ticks(4).orient("left");

      // An area generator, for the light fill.
      var area = d3.svg.area()
      .interpolate("step-after")
      .x(function(d) { return x(d.date); })
      .y0(h)
      .y1(function(d) { return y(d.amount); });

      // A line generator, for the dark stroke.
      var line = d3.svg.line()
      .interpolate("step-after")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.amount); });

      // Filter to one symbol; the S&P 500.
      // var values = data.filter(function(d) {
      //   return d.symbol == "S&P 500";
      // });

      // Parse dates and numbers. We assume values are sorted by date.
      data.forEach(function(d) {
        d.date = parse(d.date);
        d.amount = +d.amount;
      });

      // Compute the minimum and maximum date, and the maximum price.
      x.domain([data[0].date, data[data.length - 1].date]);
      y.domain([d3.min(data, function(d) { return d.amount; }), d3.max(data, function(d) { return d.amount; })]).nice();

      // Add an SVG element with the desired dimensions and margin.
      this.div = d3.select( $('div.graph', this.$el).get(0) );
      var svg = this.div.append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

      // Add the clip path.
      svg.append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", w)
      .attr("height", h);

      // Add the area path.
      svg.append("svg:path")
      .attr("class", "area")
      .attr("clip-path", "url(#clip)")
      .attr("d", area(data));

      // Add the x-axis.
      svg.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

      // Add the y-axis.
      svg.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis);

      // Add the line path.
      svg.append("svg:path")
      .attr("class", "line")
      .attr("clip-path", "url(#clip)")
      .attr("d", line(data));

      // Add a small label for the symbol name.
      // svg.append("svg:text")
      //   .attr("x", w - 6)
      //   .attr("y", h - 6)
      //   .attr("text-anchor", "end")
      //   .text(values[0].symbol);

      // On click, update the x-axis.
      // svg.on("click", function() {
      //   var n = data.length - 1,
      //   i = Math.floor(Math.random() * n / 2),
      //   j = i + Math.floor(Math.random() * n / 2) + 1;
      //   x.domain([values[i].date, values[j].date]);
      //   var t = svg.transition().duration(750);
      //   t.select(".x.axis").call(xAxis);
      //   t.select(".area").attr("d", area(values));
      //   t.select(".line").attr("d", line(values));
      // });

    },


    plot_demo: function(options) {
      var data = [4, 8, 15, 16, 23, 42];

      this.div = d3.select( $('div.graph', this.$el).get(0) );
      var chart = this.div.append("svg")
      .attr("class", "chart")
      .attr("width", 440)
      .attr("height", 140)
      .append('g')
      .attr("transform", "translate(10,15)");

      var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

      var y = d3.scale.ordinal()
      .domain(data)
      .rangeBands([0, 120]);

      // marker lines (grid)
      chart.selectAll("line")
      .data(x.ticks(10))
      .enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", 120)
      .style("stroke", "#ccc");

      // ruler above
      chart.selectAll(".rule")
      .data(x.ticks(10))
      .enter().append("text")
      .attr("class", "rule")
      .attr("x", x)
      .attr("y", 0)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);

      chart.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("y", y)
      .attr("width", x)
      .attr("height", y.rangeBand());

      chart.selectAll(".bar")
      .data(data)
      .enter().append("text")
      .attr("class", "bar")
      .attr("x", x)
      .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
      .attr("dx", -5)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(String);

      // line to left of bars
      chart.append("line")
      .attr("y1", 0)
      .attr("y2", 120)
      .style("stroke", "#000");

    },
  });

  return BankAccountGraphView;
});
