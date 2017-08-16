function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function refreshImage(){
	d3.selectAll(".square")
	.style("fill", function(d) { 
					//console.log(d)
					if(d.wall) {return "#6980d3";}
					else if(d.right || d.left || d.up || d.down){return "#C2133C";}
					else{return "#221"} })
				//return "#333";})
}




