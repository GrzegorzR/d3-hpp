


function calculateDensity(){

	var alives =0;
	for (var row = 0; row < mSize; row++) {
		for (var column = 0; column < mSize; column++) {
			if(gridData[row][column].alive){
				alives++;
			}
			
		}
	}
	return alives/(mSize*mSize);
}

function plot(){
	
	yData = calculateDensity();
	xData = chartData[0].x.length;
	
	chartData[0].x.push(xData);
	chartData[0].y.push(yData);

	if(xData%30 ==0){
		Plotly.newPlot('myDiv', chartData);
	}
	
}
