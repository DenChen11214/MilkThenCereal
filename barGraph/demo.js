var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([30, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Global Sales:</strong> <span style='color:red'>" + d.values.Global_Sales + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 200)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("VideoGameSales.csv", type, function(error, data) {
  var nested_data = d3.nest()
    .key(function(d) { return d.Genre; })
    .rollup(function(leaves) { return {"Global_Sales": d3.sum(leaves, function(d) {return parseFloat(d.Global_Sales);})} })
    .entries(data);
  x.domain(nested_data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(nested_data, function(d) { return d.values.Global_Sales; })]);

  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Global Sales vs Genre");
  svg.append("text")
      .attr("class", "x label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("font-size","16px")
      .style("text-anchor", "middle")
      .text("Genre");
  svg.append("text")
      .attr("class", "x label")
      .attr("transform","rotate(-90)")
      .attr("x", -height/2)
      .attr("y", -15)
      .attr("font-size","16px")
      .style("text-anchor", "middle")
      .text("Global Sales");
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(30,0)")
      .call(yAxis)
  svg.selectAll(".bar")
      .data(nested_data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) {return y(d.values.Global_Sales); })
      .attr("height", function(d) { return height - y(d.values.Global_Sales); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.Global_Sales = +d.Global_Sales;
  return d;
}
