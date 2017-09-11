


function calculateDensityUp(){

	var alives =0;
	var wallY = wallH*mSize;

	for (var row = 0; row < wallY; row++) {
		for (var column = 0; column < mSize; column++) {
			if(gridData[row][column].right ||
			   gridData[row][column].left  ||
			   gridData[row][column].up    ||
			   gridData[row][column].down ){
				alives++;
			}
			
		}
	}
	return alives/(mSize*wallY);
}


function calculateDensityDown(){

	var alives =0;
	var wallY = wallH*mSize;

	for (var row = wallY; row < mSize; row++) {
		for (var column = 0; column < mSize; column++) {
			if(gridData[row][column].right ||
			   gridData[row][column].left  ||
			   gridData[row][column].up    ||
			   gridData[row][column].down ){
				alives++;
			}
			
		}
	}
	return alives/(mSize*(mSize - wallY));

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
