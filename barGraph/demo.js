var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([30, width], .1);

var x1 = d3.scale.ordinal();

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
    for(value in d){
      sales = d[value]
    }
    return "<strong>Sales:</strong> <span style='color:red'>" + sales + "</span>";
  })

var color = d3.scale.ordinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de"]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 200)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("VideoGameSales.csv", function(error, data) {
  var nested_data = d3.nest()
    .key(function(d) { return d.Genre; })
    .rollup(function(leaves) {
      return {"NA_Sales": d3.sum(leaves, function(d) {return parseFloat(d.NA_Sales);}),
              "EU_Sales": d3.sum(leaves, function(d) {return parseFloat(d.EU_Sales);}),
              "JP_Sales": d3.sum(leaves, function(d) {return parseFloat(d.JP_Sales);}),
              "Other_Sales": d3.sum(leaves, function(d) {return parseFloat(d.Other_Sales);})}})
    .entries(data);
  var region = nested_data.map(function(d,i){
    area = []
    for(value in d.values){
      area.push(value)
    }
    return area[i]}).splice(0,4)
  var genre = nested_data.map(function(d){return d.key});
  x.domain(genre);
  x1.domain(region).rangeRoundBands([0,x.rangeBand()]);
  y.domain([0, d3.max(nested_data, function(d) {
    sales = []
    for(value in d.values){
      sales.push(d.values[value])
    }
    return Math.max.apply(Math, sales)})]);

  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Sales vs Genre");
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
      .text("Sales(Millions)");
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(30,0)")
      .call(yAxis)
  var slice = svg.selectAll(".slice")
      .data(nested_data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x(d.key) + ",0)"; });
  slice.selectAll("rect")
      .data(function(d) {
        sales = []
        for(value in d.values){
          var dict = {};
          dict[value] = d.values[value]
          sales.push(dict)
        }
        return sales; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d,i) { return x1(region[i]); })
      .style("fill", function(d,i) { return color(region[i]) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d,i) {
          d3.select(this).style("fill", d3.rgb(color(region[i])).darker(2));
      })
      .on("mouseout", function(d,i) {
          d3.select(this).style("fill", color(region[i]));
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d,i) {
      for(value in d){
        sales = d[value]
      }
      return y(sales)})
      .attr("height", function(d,i) {
      for(value in d){
        sales = d[value]
      }
      return height - y(sales)});

  sales = []
  sample = nested_data[0]["values"]
  for(value in sample){
    var dict = {};
    dict[value] = sample[value]
    sales.push(dict)
  }
  console.log(sales)
  var legend = svg.selectAll(".legend")
      .data(sales.map(function(d,i) { return region[i]; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });
  legend.transition().delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
});
