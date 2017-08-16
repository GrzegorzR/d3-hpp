var result = oldData[][] 
	if(!oldData[column][row].wall){
		var newRight  = oldData[row - 1][column].right || (oldData[row - 1][column].wall && oldData[row][column].left);
		var newLeft  = oldData[row + 1][column].left || (oldData[row + 1][column].wall && oldData[row][column].right);  
		var newUp  = oldData[row][column - 1].up || (oldData[row][column - 1].wall && oldData[row][column].down);
		var newDown  = oldData[row + 1][column].left || (oldData[row + 1][column].wall && oldData[row][column].right);
	}
	else{
		return oldData[column][row];
	}

}
