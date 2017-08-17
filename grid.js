


var gridData = createGridData();	




function vis(){
var grid = d3.select("#grid")
	.append("svg")
	.attr("width", imgSize +"px")
	.attr("height",imgSize +"px")
	.style("display", "block")
	.style("margin", "auto");

	console.log(grid);
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	console.log("asdasd");

var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("xnum", function(d) { return d.num; })
	.attr("ynum", function(d) { return d.num; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", function(d) { 
					//console.log(d)
					if(d.wall) {return "#6980d3";}
					else if(d.right || d.left || d.up || d.down){return "#C2133C";}
					else{return "#221"} })
				//return "#333";})
	.style("stroke", "#222")
	.on('click', function(d) {
    });
}






function restart(){

	d3.select("#grid").html("");
	gridData = createGridData(); 
	on = false;
	vis();

}




function step(){	
	if(on){
		simulationStep(gridData);
		refreshImage();
	}
	

}


function oneStep(){
	plot();
	simulationStep();
	refreshImage();
}



restart();
setInterval(step, stepTime);




