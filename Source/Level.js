
class Level
{
	constructor(sizeInCells)
	{
		this.sizeInCells = sizeInCells;
		this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
		(
			new Coords(1, 1)
		);

		this.mover = null;
		this.food = null;

		this.isOver = false;

	}

	initialize()
	{
		var moverPosInitial = this.sizeInCells.clone().divideScalar(2).floor();
		var moverForwardInitial = new Coords(1, 0);	
	
		this.mover = new Mover
		(
			"Mover0",
			moverForwardInitial,
			// cellPositionsOccupied
			[ 
				moverPosInitial,
				moverPosInitial.clone().subtract(moverForwardInitial)
			
			] 
		);

		this.foodSpawn();
	}

	foodSpawn()
	{
		var isFoodPosOccupiedByMover = true;

		while (isFoodPosOccupiedByMover)
		{
			var foodPos = new Coords().randomize().multiply
			(
				this.sizeInCells
			).floor();

			isFoodPosOccupiedByMover = this.mover.occupiesCellAtPos
			(
				foodPos
			);
		};

		this.food = new Food
		(
			foodPos
		);
	}

	updateForTimerTick()
	{
		if (this.isOver)
		{
			return;
		}

		var inputHelper = Globals.Instance.inputHelper;
		var keyCodePressed = inputHelper.keyCodePressed;
		if (keyCodePressed == 65) // a
		{
			this.mover.forward.left();
		}
		else if (keyCodePressed == 68) // d
		{
			this.mover.forward.right();	
		}
		inputHelper.keyCodePressed = null;

		this.mover.updateForTimerTick(this);

		if (this.food == null)
		{
			this.foodSpawn();
		}

		Globals.Instance.displayHelper.drawLevel(this);
	}
}
