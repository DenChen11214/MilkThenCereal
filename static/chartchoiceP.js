var p = document.getElementById("chartchoiceP");

var s1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod mauris ut metus rutrum porta. Quisque sed elit at diam porttitor tempor. Vivamus porttitor, nunc id faucibus tristique, risus tellus finibus massa, ut molestie urna augue sit amet risus. Sed non ullamcorper enim, et semper libero. Integer id imperdiet dui.";
var s2 = "Doggo ipsum lotsa pats you are doin me a concern yapper very taste wow long doggo fat boi waggy wags, sub woofer lotsa pats fluffer tungg very hand that feed shibe. Porgo smol doge sub woofer yapper sub woofer, most angery pupper I have ever seen smol long bois.";

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function update(s){
	p.innerHTML = "";
	var l = s.length;
	var ms = 2000 / l;
	for(var i = 0; i < l; i++){
		p.innerHTML += s[i];
		await sleep(ms);
	}
}
function showPie(){
  document.getElementById('pie').style.display ='block';
  document.getElementById('bar').style.display ='none';
}
function showBar(){
  document.getElementById('pie').style.display ='none';
  document.getElementById('bar').style.display = 'block';
}
var pc = document.getElementById("piechoice");
pc.addEventListener("click", function(){update(s1,showPie())});

var bc = document.getElementById("barchoice");
bc.addEventListener("click", function(){update(s2), showBar()});
