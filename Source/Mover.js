class Mover
{
	constructor
	(
		name, color, controlKeysLeftAndRight, forward, cellPositionsOccupied
	)
	{
		this.name = name;
		this.color = color;
		this.controlKeysLeftAndRight = controlKeysLeftAndRight;
		this.forward = forward;
		this.cellPositionsOccupied = cellPositionsOccupied;
	}

	length()
	{
		return this.cellPositionsOccupied.length - 1;
	}
	
	occupiesCellAtPos(cellPosToCheck)
	{
		var returnValue = false;

		for (var i = 0; i < this.cellPositionsOccupied.length; i++)
		{
			var cellPos = this.cellPositionsOccupied[i];
			if (cellPos.equals(cellPosToCheck))
			{
				returnValue = true;
				break;
			}
		}

		return returnValue;
	}

	updateForTimerTick(level)
	{
		var length = this.cellPositionsOccupied.length;

		var cellPosNext = this.cellPositionsOccupied[0].clone().add
		(
			this.forward
		);

		if (cellPosNext.isInRange(level.sizeInCellsMinusOnes) == false)
		{
			level.isOver = true;
		}

		var doesAnyMoverOccupyCellPosNextSoFar = false;
		
		var movers = level.movers;
		for (var m = 0; m < movers.length; m++)
		{
			var mover = movers[m];
			if (mover.occupiesCellAtPos(cellPosNext))
			{
				level.isOver = true;
			}
		}

		this.cellPositionsOccupied.splice(0, 0, cellPosNext);

		var foods = level.foods;
		for (var f = 0; f < foods.length; f++)
		{
			var food = foods[f];
			var foodPos = food.pos;

			if (cellPosNext.equals(foodPos))
			{
				foods.splice(foods.indexOf(food), 1);
				f--;
			}
			else
			{
				this.cellPositionsOccupied.splice(-1, 1);
			}
		}
	}
}
