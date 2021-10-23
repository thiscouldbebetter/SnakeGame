class Mover
{
	constructor(name, forward, cellPositionsOccupied)
	{
		this.name = name;
		this.forward = forward;
		this.cellPositionsOccupied = cellPositionsOccupied;
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

		if (this.occupiesCellAtPos(cellPosNext))
		{
			level.isOver = true;
		}

		this.cellPositionsOccupied.splice(0, 0, cellPosNext);

		var foodPos = level.food.pos;

		if (cellPosNext.equals(foodPos))
		{
			level.food = null;
		}
		else
		{
			this.cellPositionsOccupied.splice(-1, 1);
		}
	}
}
