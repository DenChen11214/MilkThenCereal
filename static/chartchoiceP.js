var p = document.getElementById("chartchoiceP");
var b = document.getElementById("chartchoiceB");
var s1 = "This is an interactive pie chart. You can choose the divide sections of the pie chart into different categories based on what you select on the drop down below. Hover over sections of the pie chart to see the number and percentage of games occupied by it. If you click on the section, a list of games will appear. You can click on at most two sections to compare the games contained side by side. You can only select at most 2 sections at a time! To reset the pie chart just click the center.";
var s2 = "This is an interactive bar graph. You can choose a category in the dropdown, and the graph will change to create a bar graph of Sales vs The Category You Chose. There are four different colored bars representing different regions for each item in the category you chose. Hover over a bar to see the number of sales for that item in that specific region."

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function update(s,p){
	p.innerHTML = "";
	var l = s.length;
	var ms = 2000 / l;
	for(var i = 0; i < l; i++){
		p.innerHTML += s[i];
		await sleep(ms);
	}
}
function showPie(){
	d3.select('#pie').transition().duration(700).style("opacity","1");
	d3.select('#bar').transition().duration(700).style("opacity","0");
  document.getElementById('pie').style.display ='block';
  document.getElementById('bar').style.display ='none';
}
function showBar(){
	d3.select('#pie').transition().duration(700).style("opacity","0");
	d3.select('#bar').transition().duration(700).style("opacity","1");
  document.getElementById('pie').style.display ='none';
  document.getElementById('bar').style.display = 'block';
}
var pc = document.getElementById("piechoice");
pc.addEventListener("click", function(){
	update(s1,p)
	showPie()});

var bc = document.getElementById("barchoice");
bc.addEventListener("click", function(){
	console.log(1);
	update(s2,p)
	showBar()});
