var $charts = $('#bar-graph');

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

var charts= d3.select('#bar-graph').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 200)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

charts.call(tip);

d3.csv("/data/VideoGameSales.csv", function(error, data) {
  var changeBut = document.getElementById("changeBar")
  var indVarBar = "Genre"
  changeBut.addEventListener("click",function(e){
    indVarBar = document.getElementById("indVarBar").value
    nested_data = d3.nest()
      .key(function(d) {
        if (indVarBar == "Genre"){
          return d.Genre;
        }
        if (indVarBar == "Publisher"){
          return d.Publisher;
        }if (indVarBar == "Year_of_Release"){
          return d.Year_of_Release;
        }
        if (indVarBar == "Developer"){
          return d.Developer;
        }
        if (indVarBar == "Rating"){
          return d.Rating;
        }
        if (indVarBar == "Platform"){
          return d.Platform;
        }
        if (indVarBar == "Critic_Score"){
          return d.Critic_Score;
        }
      })
      .rollup(function(leaves) {
        return {"NA_Sales": d3.sum(leaves, function(d) {return parseFloat(d.NA_Sales);}),
                "EU_Sales": d3.sum(leaves, function(d) {return parseFloat(d.EU_Sales);}),
                "JP_Sales": d3.sum(leaves, function(d) {return parseFloat(d.JP_Sales);}),
                "Other_Sales": d3.sum(leaves, function(d) {return parseFloat(d.Other_Sales);})}})
      .entries(data)
      .sort(function(a,b){
        if(indVarBar != "Year_of_Release" && indVarBar != "Critic_Score"){
            return d3.descending((a.values.NA_Sales + a.values.EU_Sales + a.values.JP_Sales + a.values.Other_Sales),
            (b.values.NA_Sales + b.values.EU_Sales + b.values.JP_Sales + b.values.Other_Sales))
        }
      });
      if(indVarBar == "Developer" || indVarBar == "Publisher"){
        nested_data = nested_data.slice(0,15)
      }
      if(indVarBar == "Year_of_Release"){
        nested_data = nested_data.slice(6,21)
      }
      criticScores = [{ "key": "20-29", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "30-39", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "40-49", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "50-59", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "60-69", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "70-79", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "80-89", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}},
                      { "key": "90-29", "values": {"NA_Sales": 0 , "EU_Sales": 0, "JP_Sales" : 0, "Other_Sales" : 0}}]
      if(indVarBar == "Critic_Score"){
        for(score in nested_data){
          for(var i = 2; i < 10 ;i++){
            if(parseInt(nested_data[score].key) >= i * 10 && parseInt(nested_data[score].key) < (i + 1 ) * 10){
              criticScores[i - 2].values.NA_Sales += nested_data[score].values.NA_Sales;
              criticScores[i - 2].values.EU_Sales += nested_data[score].values.EU_Sales;
              criticScores[i - 2].values.JP_Sales += nested_data[score].values.JP_Sales;
              criticScores[i - 2].values.Other_Sales += nested_data[score].values.Other_Sales;
            }
          }
        }
        nested_data = criticScores
      }

      updateSlice(nested_data)
  })

  var nested_data = d3.nest()
    .key(function(d) { return d.Genre; })
    .rollup(function(leaves) {
      return {"NA_Sales": d3.sum(leaves, function(d) {return parseFloat(d.NA_Sales);}),
              "EU_Sales": d3.sum(leaves, function(d) {return parseFloat(d.EU_Sales);}),
              "JP_Sales": d3.sum(leaves, function(d) {return parseFloat(d.JP_Sales);}),
              "Other_Sales": d3.sum(leaves, function(d) {return parseFloat(d.Other_Sales);})}})
    .entries(data)
    .sort(function(a,b){
      return d3.descending((a.values.NA_Sales + a.values.EU_Sales + a.values.JP_Sales + a.values.Other_Sales),
      (b.values.NA_Sales + b.values.EU_Sales + b.values.JP_Sales + b.values.Other_Sales))
    });
  var region = nested_data.map(function(d,i){
    area = []
    for(value in d.values){
      area.push(value)
    }
    return area[i]}).splice(0,4)
  var xVar = nested_data.map(function(d){return d.key});
  x.domain(xVar);
  x1.domain(region).rangeRoundBands([0,x.rangeBand()]);
  y.domain([0, d3.max(nested_data, function(d) {
    sales = []
    for(value in d.values){
      sales.push(d.values[value])
    }
    return Math.max.apply(Math, sales)})]);
  charts.append("text")
        .attr("x", (width / 2))
        .attr("id", "title")
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Sales vs " + indVarBar );
  charts.append("text")
      .attr("class", "x label")
      .attr("id","xAxis")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("font-size","16px")
      .style("text-anchor", "middle")
      .text(indVarBar);
  charts.append("text")
      .attr("class", "y label")
      .attr("id", "yAxis")
      .attr("transform","rotate(-90)")
      .attr("x", -height/2)
      .attr("y", -15)
      .attr("font-size","16px")
      .style("text-anchor", "middle")
      .text("Sales(Millions)");
  var xAxisUpdate = charts.append("g")
      .attr("class", "x axis")
      .attr("id","xTick")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
  var yAxisUpdate = charts.append("g")
      .attr("class", "y axis")
      .attr("id","yTick")
      .attr("transform", "translate(30,0)")
      .call(yAxis)
  var legend = charts.selectAll(".legend")
      .data(sales.map(function(d,i) { return region[i]; }))
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

  var slice
  var updateSlice = function(data) {
    var xVar = data.map(function(d){ return d.key});
    x.domain(xVar);
    x1.domain(region).rangeRoundBands([0,x.rangeBand()]);
    y.domain([0, d3.max(data, function(d) {
      sales = []
      for(value in d.values){
        sales.push(d.values[value])
      }
      return Math.max.apply(Math, sales)})]);
      charts.select("#title")
            .attr("x", (width / 2))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Sales vs " + indVarBar );
      charts.select("#xAxis")
          .attr("class", "x label")
          .attr("x", width / 2)
          .attr("y", height + 70)
          .attr("font-size","16px")
          .style("text-anchor", "middle")
          .text(indVarBar);
      charts.select("#yAxis")
          .attr("class", "y label")
          .attr("transform","rotate(-90)")
          .attr("x", -height/2)
          .attr("y", -15)
          .attr("font-size","16px")
          .style("text-anchor", "middle")
          .text("Sales(Millions)");
      xAxisUpdate = charts.select("#xTick")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .transition().duration(1500).ease("sin-in-out")
          .call(xAxis)
      xAxisUpdate.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)" );
      yAxisUpdate = charts.select("#yTick")
          .attr("class", "y axis")
          .attr("transform", "translate(30,0)")
          .transition().duration(1500).ease("sin-in-out")
          .call(yAxis)
    yAxisUpdate.call(yAxis);
    xAxisUpdate.call(xAxis);

    sales = []
    sample = data[0]["values"]
    for(value in sample){
      var dict = {};
      dict[value] = sample[value]
      sales.push(dict)
    }
    d3.selectAll(".slice").remove();
    slice = charts.selectAll(".slice").data(data)
    slice
      .enter().append("g")
      .attr("class", "slice")
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
  };
  updateSlice(nested_data)
});
