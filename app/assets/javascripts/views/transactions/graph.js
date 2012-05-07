App.TransactionsGraphView = Backbone.View.extend({

  events: {
    // 'click a.servernext': 'nextResultPage',
    // 'click a.serverprevious': 'previousResultPage',
  },

  initialize: function (config) {
    this.config = config;

    this.collection.on('add', this.render, this);
    this.collection.on('reset', this.render, this);
    this.collection.on('change', this.render, this);

    // target html element
    // this.targetEl = config.targetEl;
    // console.log("targetEl: ", this.targetEl, $('#'+this.targetEl));
    this.div = d3.select(this.el)
    this.w = config.w || 200;
    this.h = config.h || 200;
    this.size = 20;
    this.duration = 500;
  },

  render: function () {
    // Draw the plot
    if (this.plotdata().length > 0) {
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
    var data = [];
    var i = 1;
    this.collection.forEach(function(datapoint) {
      data.push({
        x: i, //datapoint.get('x'),
        y: Math.sin(i/10 * Math.PI)  // datapoint.get('y')
      });
      i++;
    });
    // Needed for scolling plots
    if (data.length > this.size) {
      return _.last(data, this.size);
    } else {
      return data;
    }
    return data;
  },

  plot: function(options) {
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

  plot2: function(options) {
    var w = this.w;
    var h = this.h;
    var data = this.plotdata();
    var interpolation = this.config.interpolation || "linear";
    var x = d3.scale.linear()
    .domain([0, this.size])
    .range([10, w -10]);

    var y = d3.scale.linear()
    .domain([-1, 1])
    .rangeRound([10, h - 10]);

    // Draw axes & label

    // line
    var chart = null;
    var line = d3.svg.line()
    .x(function(d,i) { return x(d.x) })
    .y(function(d,i) { return y(d.y) })
    .interpolate(interpolation);

    if (options.newPlot) {
      chart = this.div.append("svg:svg");
      chart.selectAll("circle")
      .data(data).enter().append("svg:circle")
      .attr("cx", function(d, i) { return x(d.x) })
      .attr("cy", function(d, i) { return y(d.y) })
      .attr("id", function(d) { return d.x + '-' + d.y })
      .attr("r", 0)
      .transition()
      .duration(this.duration)
      .attr("r", this.config.pointsize || 3);

      chart.append("svg:path").attr("d", line(_.sortBy(data, function (d) { return d.x;})));

    } else {
      chart = this.div.selectAll("svg");
      var circles = chart.selectAll("circle").data(data);

      circles.enter().insert("svg:circle", "circle")
      .attr("cx", function(d, i) { return x(d.x) })
      .attr("cy", function(d, i) { return y(d.y) })
      .attr("id", function(d) { return d.x + '-' + d.y })
      .attr("r", 0)
      .transition()
      .duration(this.duration)
      .attr("r", this.config.pointsize || 3);

      // TODO: transition to grown the line between points
      chart.selectAll("path")
      // sort is needed to keep the line drawing left to right, other
      // wise goes a bit etcher sketch
      .data([_.sortBy(data, function (d) { return d.x;})])
      .attr("d", line);
    }

  }

});
