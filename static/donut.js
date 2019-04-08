var filename = 'data/VideoGameSales.csv';
var salesData;
var prevClicked = -1;
var indVarPie = "Platform";
var numCat = 15;

d3.csv(filename, function(error, givenData) {
  //var changeBut = document.getElementById("changePie")
  for (let i of document.getElementById('pieBtns').children) {
    i.addEventListener( "click", function(e){
      d3.select("#donut-charts").html("");
      indVarPie = i.children[0].value;
      var dataset = new Array();
      var data = new Array();
      var categories = {};
      var gamesInSection = {};
      var total = 0;
      for (let i of givenData){
        var sample = i[indVarPie];
        total += 1;
        if (!(sample in categories)){
          categories[sample] = 1;
        }
        else{
          categories[sample] = categories[sample] + 1;
        }
        if (!(sample in gamesInSection)){
          var arr = new Array();
          arr.push(i);
          gamesInSection[sample] = arr;
        }
        else{
          (gamesInSection[sample]).push(i);
        }
      }
      for (var j in categories){
        data.push({
          "cat": j,
          "val": categories[j],
          "games": gamesInSection[j]
        })
      }
      var type = [indVarPie];
      var unit = [' Games'];
      dataset.push({
        "type": type[0],
        "unit": unit[0],
        "data": data,
        "total": Math.round(total)
      });
      console.log(dataset)
      if(indVarPie == "Publisher" || indVarPie == "Developer"){
        dataset[0]["data"] = dataset[0]["data"].splice(0,15)
      }
      if(indVarPie == "Year_of_Release"){
        dataset[0]["data"].pop()
      }
      if(indVarPie == "Rating"){
      dataset[0]["data"].splice(5,1)
    }
      if(indVarPie == "Critic_Score"){
        console.log(dataset[0]["data"].length)
        dataset[0]["data"].pop()
        dataset[0]["data"] = dataset[0]["data"].splice(-20)
      }
      //console.log(dataset)
      numCat = dataset[0].data.length;
      var donuts = new DonutCharts();
      donuts.create(dataset);
    });
  }
  //salesData = data;
  var dataset = new Array();
  var data = new Array();
  var categories = {};
  var gamesInSection = {};
  var total = 0;
  for (let i of givenData){
    var sample = i[indVarPie];
    total += 1;
    if (!(sample in categories)){
      categories[sample] = 1;
    }
    else{
      categories[sample] = categories[sample] + 1;
    }
    if (!(sample in gamesInSection)){
      var arr = new Array();
      arr.push(i);
      gamesInSection[sample] = arr;
    }
    else{
      (gamesInSection[sample]).push(i);
    }
  }
  for (var j in categories){
    data.push({
      "cat": j,
      "val": categories[j],
      "games": gamesInSection[j]
    })
  }
  var type = [indVarPie];
  var unit = [' Games'];
  dataset.push({
    "type": type[0],
    "unit": unit[0],
    "data": data,
    "total": Math.round(total)
  });
  var donuts = new DonutCharts();
  donuts.create(dataset);
  //Data reorganization
  /*var platDct = {
    'type' : 'Votes',
    'unit' : 'Games',
    'data' : {},
    'total' : 0
  };

  for (let i of data) {
    if (!(i[indVarPie] in platDct['data'])) {
      platDct['data'][i[indVarPie]] = {
        'games' : [],
        'cat' : i[indVarPie],
        'val' : 0
      };
    }
    //console.log(platDct[data[indVarPie]]['games']);
    platDct['data'][i[indVarPie]]['games'].push(i);
    platDct['data'][i[indVarPie]]['val'] += parseFloat(i.Global_Sales);
  }
  var datLst = [];
  for (let i of Object.keys(platDct.data)) {
    platDct['total'] += platDct['data'][i]['val'];
    datLst.push(platDct['data'][i]);
  }
  platDct['data'] = datLst;
  platDct = [platDct];
  console.log("READING DATA");
  console.log(platDct);

  var donuts = new DonutCharts();
  donuts.create(platDct);
  */
});
//////////////////////////////////////////////////////////////////////
function DonutCharts() {
    var charts = d3.select('#donut-charts');
    var chart_m,
        chart_r,
        color = function(i){
            // console.log(i);
            // var outColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            var perc = i / numCat;
            var outColor = 'hsl(' + Math.round(perc * 360) + ', 100%, 50%)';
            // console.log(outColor);
            return outColor;
        };
    var getCatNames = function(dataset) {
        var catNames = new Array();

        for (var i = 0; i < dataset[0].data.length; i++) {
            catNames.push(dataset[0].data[i].cat);
        }

        return catNames;
    }
//////////////////////////////////////////////////////////////
// INTERACTIVE WITH PIE CHART CENTER AND TRANSITIONS
    var createCenter = function(pie) {
        var eventObj = {
            'mouseover': function(d, i) {
                d3.select(this)
                    .transition()
                    .attr("r", chart_r * 0.65);
            },
            'mouseout': function(d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr("r", chart_r * 0.6);
            },
            'click': function(d, i) {
                var paths = charts.selectAll('.clicked');
                pathAnim(paths, 0);
                paths.classed('clicked', false);
                resetAllCenterText();
                d3.select('.donut') //Move donut back to center
                    .transition()
                    .duration(1000)
                    .ease('quad')
                    .attr('transform', 'translate(' + (chart_r+chart_m) * 2 + ',' + (chart_r+chart_m) + ')');
                d3.selectAll('.game')
                    .transition()
                    .duration(500)
                    .style("opacity","0")
                    .remove();
                charts.selectAll('.gamesHeader').transition()
                    .duration(500)
                    .style("opacity","0")
                    .remove()
                prevClicked = -1;
            }
        }
        var donuts = d3.selectAll('.donut');
        // The circle displaying total data.
        donuts.append("svg:circle")
            .attr("r", chart_r * 0.6)
            .style("fill", "#E7E7E7")
            .on(eventObj);
        donuts.append('text')
                .attr('class', 'center-txt type')
                //.attr('y', chart_r * -0.16)
                .attr('y', chart_r * -0.16)
                .attr('text-anchor', 'middle')
                .style('font-weight', 'bold')
                .text(function(d, i) {
                    return d.type;
                });
        donuts.append('text')
              .attr('class', 'center-txt value')
              .attr('y', chart_r * 0.08)
              .attr('text-anchor', 'middle');
        donuts.append('text')
                .attr('class', 'center-txt name')
                .attr('text-anchor', 'middle');
        donuts.append('text')
                .attr('class', 'center-txt percentage')
                .attr('y', chart_r * 0.16)
                .attr('text-anchor', 'middle')
                .style('fill', '#A2A2A2');
        console.log("center should have been created");
    }

    var setCenterText = function(thisDonut) {
        var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
            return d.data.val;
        });
        thisDonut.select('.name')
            .text(function(d){
                return '';
            });
        thisDonut.select('.value')
            .text(function(d) {
                return (sum)? Math.round(sum.toFixed(1)) + d.unit
                            : Math.round(d.total.toFixed(1)) + d.unit;
            });
        thisDonut.select('.percentage')
            .text(function(d) {
                return (sum)? (sum/d.total*100).toFixed(2) + '%'
                            : '';
            });
    }
    var resetAllCenterText = function() {
        charts.selectAll('.name')
            .text('');
        charts.selectAll('.value')
            .text(function(d) {
                return Math.round(d.total.toFixed(1)) + d.unit;
            });
        charts.selectAll('.percentage')
            .text('');
    }
    var pathAnim = function(path, dir) {
        switch(dir) {
            case 0:
                path.transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('d', d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(chart_r)
                    );
                break;
            case 1:
                path.transition()
                    .attr('d', d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(chart_r * 1.08)
                    );
                break;
        }
    }
    // INTERACTIVE WITH INNER PIE CHART CIRCLE CODE
/////////////////////////////////////////////////////////
    var updateDonut = function() {
        var numClicked;
        var currDat = [];
        var prevGameData = new Set();
        var eventObj = {
            'mouseover': function(d, i, j) {
                //console.log(d.data.cat);
                pathAnim(d3.select(this), 1);
                var thisDonut = charts.select('.type' + j);
                thisDonut.select('.name').text(function(donut_d) {
                    return d.data.cat;
                });
                thisDonut.select('.value').text(function(donut_d) {
                    return Math.round(d.data.val.toFixed(1)) + donut_d.unit;
                });
                thisDonut.select('.percentage').text(function(donut_d) {
                    return (d.data.val/donut_d.total*100).toFixed(2) + '%';
                });
            },
            'mouseout': function(d, i, j) {
                var thisPath = d3.select(this);
                if (!thisPath.classed('clicked')) {
                    pathAnim(thisPath, 0);
                }
                var thisDonut = charts.select('.type' + j);
                setCenterText(thisDonut);
            },
            'click': function(d, i, j) {
                var thisDonut = charts.select('.type' + j);

                if (0 === thisDonut.selectAll('.clicked')[0].length) {
                    thisDonut.select('circle').on('click')();
                }
                /////// TESTING////////////////////////
                /*
                var svgContainer = d3.select("body").append("svg")
                                      .attr("width",500)
                                      .attr("height",500);
                var text = svgContainer.selectAll("text")
                                      .attr("font-size", "20px")
                                      .append("text");
                var textLabels = text
                                .text( function (d) { return "test"})
                */
                ///////////////////////////////////////////////////////////////////////
                var currGames = [];
                var thisPath = d3.select(this);
                if (thisDonut.selectAll('.clicked')[0].length == 2 && thisPath.attr("class") != 'clicked' ){

                }
                else{
                  var clicked = thisPath.classed('clicked');
                  pathAnim(thisPath, ~~(!clicked));
                  thisPath.classed('clicked', !clicked);
                  setCenterText(thisDonut);
                  var currSections = [];
                  prevGameData.clear();
                  for (let platform of currDat){
                    prevGameData.add(platform.data.cat);
                  }
                  currDat = thisDonut.selectAll('.clicked').data();

                  //////////////////////////////////////////////////
                  if (prevClicked === -1){
                    prevClicked = thisDonut.selectAll('.clicked')[0].length;
                  } else{
                    prevClicked = numClicked;
                  }
                  numClicked = thisDonut.selectAll('.clicked')[0].length;
                  //console.log("previsouly clicked " + prevClicked);
                  //console.log("now " + numClicked);
                  //console.log("current " + currDat);
                  if (prevClicked == 1 && numClicked == 2){
                    for (let platform of currDat){
                      if (!prevGameData.has(platform.data.cat)){
                        for (let game of platform.data.games) {
                          currGames.push(game);
                        }
                      }
                      //console.log(currGames);
                    }
                  }
                  else{
                    for (let platform of currDat) { //Create list of selected games
                      for (let game of platform.data.games) {
                        currGames.push(game);
                      }
                    }
                  }
                  var games = charts.select('.mainChart').selectAll('.g')
                                  .data(currGames);
                  //console.log(currGames);
                  if (numClicked == 0) { //Activated upon deselection of everything
                    charts.selectAll('.gamesHeader').transition()
                        .duration(500)
                        .style("opacity","0")
                        .remove()
                    d3.selectAll('.game')
                        .transition()
                        .duration(500)
                        .style("opacity","0")
                        .remove();
                    d3.select('.donut') //Move donut back to center
                        .transition()
                        .duration(800)
                        .ease('quad')
                        .attr('transform', 'translate(' + (chart_r+chart_m) * 2 + ',' + (chart_r+chart_m) + ')');
                  } else if (numClicked == 1) { //Activated once
                    if (prevClicked == 2){
                      d3.selectAll('.gamesHeader')
                          .transition()
                          .style("opacity","0")
                          .remove();
                      d3.selectAll('.game')
                          .transition()
                          .style("opacity","0")
                          .remove();
                      charts.select('.mainChart').append('g')
                          .attr('class', 'gamesHeader')
                          .style('opacity', '1')
                          .style('fill', '#00FF00')
                          .append('text')
                          .attr('x', (chart_r + chart_m) * 2)
                          .attr('y', 9)
                          .attr('dy', '.35em')
                          .style('text-anchor', 'start')
                          .style('font-weight', 'bold')
                          .style('fill', '#00FF00')
                          .text(currGames[0][indVarPie] + " games");

                      games.enter().append('g')
                          .attr('class', 'game')
                          .attr('transform', function(d,i) { return "translate(0," + (20 + i * 20) + ")"; })
                          .style('fill', '#00FF00')
                          .style('opacity', '0');

                      games.append('text')
                          .attr('x', (chart_r+chart_m) * 2)
                          .attr('y', 9)
                          .attr('dy', ".35em")
                          .style('text-anchor', 'start')
                          .style('fill', '#00FF00')
                          .text(function(d,i) {return d.Name;});

                      games.transition()
                          .delay(function(d,i){ return 10 * i; })
                          .style("opacity","1");

                    }
                    else{
                      d3.select('.donut') //Move donut to the left
                          .transition()
                          .duration(1000)
                          .ease('quad')
                          .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

                      charts.select('.mainChart').append('g')
                          .attr('class', 'gamesHeader')
                          .style('opacity', '0')
                          .style('fill', '#00FF00')
                      .append('text')
                          .attr('x', (chart_r + chart_m) * 2)
                          .attr('y', 9)
                          .attr('dy', '.35em')
                          .style('text-anchor', 'start')
                          .style('font-weight', 'bold')
                          .style('fill', '#00FF00')
                          .text(currGames[0][indVarPie] + " games");
                      charts.selectAll('.gamesHeader').transition()
                          .delay(1000)
                          .style('fill', '#00FF00')
                          .style("opacity","1");

                      games.enter().append('g')
                          .attr('class', 'game')
                          .attr('transform', function(d,i) { return "translate(0," + (20 + i * 20) + ")"; })
                          .style('fill', '#00FF00')
                          .style('opacity', '0');

                      games.append('text')
                          .attr('x', (chart_r+chart_m) * 2)
                          .attr('y', 9)
                          .attr('dy', ".35em")
                          .style('text-anchor', 'start')
                          .style('fill', '#00FF00')
                          .text(function(d,i) {return d.Name;});

                      games.transition()
                          .delay(function(d,i){ return 1010 + 10 * i; })
                          .style('fill', '#00FF00')
                          .style("opacity","1");
                    }

                  }
                  else if (numClicked == 2){

                    charts.select('.mainChart').append('g')
                        .attr('class', 'gamesHeader')
                        .style('opacity', '0')
                        .style('fill', '#00FF00')
                    .append('text')
                        .attr('x', (chart_r + chart_m) * 3)
                        .attr('y', 9)
                        .attr('dy', '.35em')
                        .style('text-anchor', 'start')
                        .style('font-weight', 'bold')
                        .style('fill', '#00FF00')
                        .text(currGames[currGames.length-1][indVarPie] + " games");

                    charts.selectAll('.gamesHeader').transition()
                        .delay(0)
                        .style("opacity","1");

                    games.enter().append('g')
                        .attr('class', 'game')
                        .attr('transform', function(d,i) { return "translate(0," + (20 + i * 20) + ")"; })
                        .style('fill', '#00FF00')
                        .style('opacity', '0');

                    games.append('text')
                        .attr('x', (chart_r+chart_m) * 3)
                        .attr('y', 9)
                        .attr('dy', ".35em")
                        .style('text-anchor', 'start')
                        .style('fill', '#00FF00')
                        .text(function(d,i) {return d.Name;});

                    games.transition()
                        .delay(function(d,i){ return 100 + 10 * i; })
                        .style("opacity","1");
                  }
              }
                }
                // DISPLAYING GAMES /////////////////////////////////////////////

        };
        var pie = d3.layout.pie()
                        .sort(null)
                        .value(function(d) {
                            return d.val;
                        });
        var arc = d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(function() {
                            return (d3.select(this).classed('clicked'))? chart_r * 1.08
                                                                       : chart_r;
                        });
///////////////////////////////////////////////////
        //READING CSV FILE ************************
        var paths = charts.selectAll('.donut')
                        .selectAll('path')
                        .data(function(d, i) {
                          /*
                            var currDat = [{
                              'cat' : d[indVarPie],
                              'val' : d.Name
                            }]
                            */
                            //console.log(currDat);
                            return pie(d.data);
                        });

        paths
            .transition()
            .duration(1000)
            .attr('d', arc);

        paths.enter()
            .append('svg:path')
                .attr('d', arc)
                .style('fill', function(d, i) {
                    return color(i);
                })
                .style('stroke', 'rgb(0,0,0)')
                .on(eventObj)

        paths.exit().remove();

        resetAllCenterText();
    }
//////////////////////////////////////////////////////////////////
//ACTUAL CREATION OF DONUT
    this.create = function(dataset) {
        console.log("making it rn");
        var $charts = $('#donut-charts');
        chart_m = $charts.innerWidth() / dataset.length / 2 * 0.07;
        chart_r = $charts.innerWidth() / dataset.length / 2 * 0.425;

        charts.append('svg')
            .attr('class', 'legend')
            .attr('width', '100%')
            .attr('height', 50);

        var donut = charts.selectAll('.donut')
                        .data(dataset)
                    .enter().append('svg:svg')
                        .attr('class', 'mainChart')
                        .attr('width', (chart_r + chart_m) * 4)
                        .attr('height', (chart_r + chart_m) * 2)
                    .append('svg:g')
                        .attr('class', function(d, i) {
                            return 'donut type' + i;
                        })
                        .attr('transform', 'translate(' + (chart_r + chart_m) * 2 + ',' + (chart_r+chart_m) + ')');

        // ^ is done but bottom steps aren't run
        createCenter();
        updateDonut();
        console.log("yep im done");
    }

    this.update = function(dataset) {
        // Assume no new categ of data enter
        var donut = charts.selectAll(".donut")
                          .data(dataset);

        updateDonut();
    }
}
