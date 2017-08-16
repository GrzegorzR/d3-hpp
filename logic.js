
function calculateParticleProb(x,y){
	if(x < mSize * wallH){
		return Math.random() < prob;
	}
	else{
		return false;
	}

}

function initilizeWalls(data){
	
	for (var row = 0; row < mSize; row++) {
		for (var column = 0; column < mSize; column++) {
			if(row == 0 || row == mSize -1 || column == 0 || column == mSize -1){
				data[row][column].wall = true;
				data[row][column].right = false;
				data[row][column].left = false;
				data[row][column].up = false;
				data[row][column].down = false;
			}
			if(row == mSize*wallH && Math.abs(column - mSize/2) > gapSize){
				data[row][column].wall = true;
				data[row][column].right = false;
				data[row][column].left = false;
				data[row][column].up = false;
				data[row][column].down = false;
			}
		
		}
	}


}




function getNeighbours(x,y,mSize){

	var up;
	var down;
	var right;
	var left;
	var result = new Array();
	
	if(x===mSize-1){
		right = 0;
	}
	else{
		right = x+1;	
	}	
	
	if(x===0){
		left = mSize -1;	
	}
	else{
		left = x -1;	
	}

	if(y===mSize-1){
		down = 0;
	}
	else{
		down = y+1;
	}

	if(y===0){
		up = mSize -1;
	}
	else{
		up = y-1;
	}
	
	result.push([left,up]);
	result.push([x,up]);
	result.push([right,up]);

	result.push([left,y]);	
	result.push([right,y]);

	result.push([left,down]);
	result.push([x,down]);
	result.push([right,down]);
	
	return result;
	
	

}






function createGridData() {
	var data = new Array();
	var xpos = 1; 
	var ypos = 1;
	var width = imgSize/mSize;
	var height = imgSize/mSize;
	var click = 0;
	
	for (var row = 0; row < mSize; row++) {
		data.push( new Array() );
		
		for (var column = 0; column < mSize; column++) {
			data[row].push({
				xnum:column,
				ynum:row,
				x: xpos,
				y: ypos,
				width: width,
				height: height, 
				click: click,
				fill: getRandomColor(),
				right: calculateParticleProb(row, column),
				left:  calculateParticleProb(row, column),
				up:  calculateParticleProb(row, column),
				down:  calculateParticleProb(row, column),
				wall: false	
				
			})
			xpos += width;
		}
		xpos = 1;
		ypos += height;	
	}
	initilizeWalls(data);
	return data;
}


function horizontalCrash(row, column, oldData){
	var crash = oldData[row ][column + 1].left && oldData[row][column -1].right;
	var noOthers = !oldData[row -1][column].up && !oldData[row +1][column].down;
	return crash && noOthers;

}

function verticalCrash(row, column, oldData){
	var crash = oldData[row - 1][column].up && oldData[row + 1][column].down;
	var noOthers = !oldData[row][column +1].left && !oldData[row][column - 1].right;
	return crash && noOthers;

}

function createCell(row, column, oldData){
	var result = jQuery.extend(true, {}, oldData[row][column]);

	if(!oldData[row][column].wall){
		result.right  = oldData[row][column -1].right || (oldData[row][column -1].wall && oldData[row][column].left);
		result.left  = oldData[row][column + 1].left || (oldData[row][column + 1].wall && oldData[row][column].right);  
		result.up  = oldData[row - 1][column].up || (oldData[row - 1][column].wall && oldData[row][column].down);
		result.down  = oldData[row + 1][column].down || (oldData[row + 1][column].wall && oldData[row][column].up);

		if(horizontalCrash(row, column, oldData)){
			result.right = false;
			result.left = false;
			result.up = true;
			result.down = true;
		}

		if(verticalCrash(row, column, oldData)){
			result.right = true;
			result.left = true;
			result.up = false;
			result.down = false;
		}

	}
	return result;

}

function applyNewData(data, oldData){
	for (var row = 0; row < mSize; row++) {
		
		for (var column = 0; column < mSize; column++) {
			oldData[row][column].right = data[row][column].right;
			oldData[row][column].left = data[row][column].left;
			oldData[row][column].up = data[row][column].up;
			oldData[row][column].down = data[row][column].down;
			
		}
	
	}
}	


function simulationStep(oldData){
	var data = new Array();


	for (var row = 0; row < mSize; row++) {
		data.push( new Array() );	
		for (var column = 0; column < mSize; column++) {
			data[row].push(createCell(row, column, oldData))
		}

	}
	
	applyNewData(data, oldData)	
	

}


