App.TransactionsGraphView = Backbone.View.extend({

  events: {
    // 'click a.servernext': 'nextResultPage',
    // 'click a.serverprevious': 'previousResultPage',
  },

  initialize: function (config) {
    this.config = config;

    // this.collection.on('add', this.render, this);
    // this.collection.on('reset', this.render, this);
    // this.collection.on('change', this.render, this);

    // target html element
    // this.targetEl = config.targetEl;
    // console.log("targetEl: ", this.targetEl, $('#'+this.targetEl));
    this.div = d3.select(this.el)
    this.w = config.w || 200;
    this.h = config.h || 200;
    this.size = 200;
    this.duration = 500;
  },

  render: function () {
    // Draw the plot
    // if (this.plotdata().length > 0) {
    if(this.collection.length > 0) {
      this.plot({
        newPlot: true
      });
    }
    return this;
  },

  redraw: function() {
    // transition the plot
    this.plot({
      newPlot: false
    });
  },

  plotdata: function() {
    var data = {};
    var i = 1;

    var models = App.transactions.origModels || App.transactions.models;

    _.each(models, function(datapoint, index) {
      if(!data[datapoint.get('date')]) {
        data[datapoint.get('date')] = 0;
      }

      // data[datapoint.get('date')] += datapoint.get('cents');
      data[datapoint.get('date')] += datapoint.attributes.amount * 100;
    });

    data = _.map(data, function(num, key) {
      return {date: key, amount: num*0.01};
    });

    // Needed for scolling plots
    if (data.length > this.size) {
      return _.last(data, this.size);
    } else {
      return data;
    }
    return data;
  },

  plot_demo: function(options) {
    var data = [4, 8, 15, 16, 23, 42];

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

  plot: function(options) {
    // var data = [
    //   {symbol: 'S&P 500', date: 'Jan 2000', price: '2991'},
    //   {symbol: 'S&P 500', date: 'Feb 2000', price: '3315'},
    //   {symbol: 'S&P 500', date: 'Mar 2000', price: '902'},
    //   {symbol: 'S&P 500', date: 'Apr 2000', price: '1734'},
    //   {symbol: 'S&P 500', date: 'May 2000', price: '4281'},
    //   {symbol: 'S&P 500', date: 'Jun 2000', price: '3492'},
    //   {symbol: 'S&P 500', date: 'Jul 2000', price: '1239'}
    // ];

    var data = this.plotdata();

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

  }

});
