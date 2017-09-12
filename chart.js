


function calculateDensityUp(){

	var alives =0;
	var counts = 0;
	var wallY = wallH*mSize;

	for (var row = 1; row < wallY; row++) {
		for (var column = 1; column < mSize; column++) {
			if(gridData[row][column].right ||
			   gridData[row][column].left  ||
			   gridData[row][column].up    ||
			   gridData[row][column].down ){
			   alives++;
			}
			counts++;
			
		}
	}
	//eturn alives/((mSize-2)*(wallY-2));
	return alives/counts;
}	


function calculateDensityDown(){

	var alives =0;
	var wallY = wallH*mSize;
		var counts = 0;


	for (var row = wallY+1 ; row < mSize; row++) {
		for (var column = 1; column < mSize; column++) {
			if(gridData[row][column].right ||
			   gridData[row][column].left  ||
			   gridData[row][column].up    ||
			   gridData[row][column].down ){
				alives++;
			}
			counts++;
		}
	}
	//return alives/((mSize-2)*(mSize - wallY -2));
	return alives/counts;
}


function plot(){
	
	yDataUp = calculateDensityUp();
	xDataUp = chartDataUp[0].x.length;

	yDataDown = calculateDensityDown();
	xDataDown = chartDataDown[0].x.length;
	
	chartDataUp[0].x.push(xDataUp);
	chartDataUp[0].y.push(yDataUp);

	chartDataDown[0].x.push(xDataDown);
	chartDataDown[0].y.push(yDataDown);

	if(xDataUp%30 ==0){
		Plotly.newPlot('myDiv', chartDataUp);
		Plotly.newPlot('myDiv2', chartDataDown);
	}
	
}
