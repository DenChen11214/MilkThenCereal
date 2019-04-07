var filename = 'data/VideoGameSales.csv';
var salesData;

d3.csv(filename, function(error, givenData) {
  //salesData = data;
  var dataset = new Array();
  var data = new Array();
  var categories = {};
  var gamesInSection = {};
  var total = 0;
  for (let i of givenData){
    total += 1;
    if (!(i.Platform in categories)){
      categories[i.Platform] = 1;
    }
    else{
      categories[i.Platform] = categories[i.Platform] + 1;
    }
    if (!(i.Platform in gamesInSection)){
      var arr = new Array();
      arr.push(i);
      gamesInSection[i.Platform] = arr;
    }
    else{
      (gamesInSection[i.Platform]).push(i);
    }
  }
  //console.log(gamesInSection);
  for (var j in categories){
    data.push({
      "cat": j,
      "val": categories[j],
      "games": gamesInSection[j]
    })
  }
  var type = ["Platforms"];
  var unit = [' games'];
  dataset.push({
    "type": type[0],
    "unit": unit[0],
    "data": data,
    "total": total
  });
  console.log(dataset);
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
    if (!(i.Platform in platDct['data'])) {
      platDct['data'][i.Platform] = {
        'games' : [],
        'cat' : i.Platform,
        'val' : 0
      };
    }
    //console.log(platDct[data.Platform]['games']);
    platDct['data'][i.Platform]['games'].push(i);
    platDct['data'][i.Platform]['val'] += parseFloat(i.Global_Sales);
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
            var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            return randomColor;
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
                return (sum)? sum.toFixed(1) + d.unit
                            : d.total.toFixed(1) + d.unit;
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
                return d.total.toFixed(1) + d.unit;
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
        var eventObj = {
            'mouseover': function(d, i, j) {
                //console.log(d.data.cat);
                pathAnim(d3.select(this), 1);
                var thisDonut = charts.select('.type' + j);
                thisDonut.select('.name').text(function(donut_d) {
                    return d.data.cat;
                });
                thisDonut.select('.value').text(function(donut_d) {
                    return d.data.val.toFixed(1) + donut_d.unit;
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

                var thisPath = d3.select(this);
                var clicked = thisPath.classed('clicked');
                pathAnim(thisPath, ~~(!clicked));
                thisPath.classed('clicked', !clicked);

                setCenterText(thisDonut);
            }
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
                              'cat' : d.Platform,
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
                .style('stroke', '#FFFFFF')
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
                        .attr('width', (chart_r + chart_m) * 2)
                        .attr('height', (chart_r + chart_m) * 2)
                    .append('svg:g')
                        .attr('class', function(d, i) {
                            return 'donut type' + i;
                        })
                        .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

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
