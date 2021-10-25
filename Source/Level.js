
class Level
{
	constructor(sizeInCells, movers)
	{
		this.sizeInCells = sizeInCells;
		this.movers = movers;

		this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
		(
			new Coords(1, 1)
		);

		this.foods = [];

		this.isOver = false;
	}

	initialize()
	{
		for (var i = 0; i < this.movers.length; i++)
		{
			var mover = this.movers[i];
			
			var moverPosInitial = new Coords
			(
				(i + 1) * this.sizeInCells.x / (this.movers.length + 1),
				this.sizeInCells.y / 2
			).floor();

			var moverForwardInitial = new Coords(1, 0);	
			mover.forward = moverForwardInitial;
			mover.cellPositionsOccupied = 
			[ 
				moverPosInitial,
				moverPosInitial.clone().subtract(moverForwardInitial)
			] 
		}

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

			for (var m = 0; m < this.movers.length; m++)
			{
				var mover = this.movers[m];
				isFoodPosOccupiedByMover = mover.occupiesCellAtPos
				(
					foodPos
				);

				if (isFoodPosOccupiedByMover)
				{
					break;
				}
			}
		};

		var food = new Food
		(
			foodPos
		);
		
		this.foods.push(food);
	}

	updateForTimerTick()
	{
		if (this.isOver)
		{
			return;
		}

		var inputHelper = Globals.Instance.inputHelper;
		var keysPressed = inputHelper.keysPressed;
		
		for (var kp = 0; kp < keysPressed.length; kp++)
		{
			var keyPressed = keysPressed[kp];
			
			for (var p = 0; p < this.movers.length; p++)
			{
				var mover = this.movers[p];
				var controlKeys = mover.controlKeysLeftAndRight;
				
				if (keyPressed == controlKeys[0])
				{
					mover.forward.left();
				}
				else if (keyPressed == controlKeys[1])
				{
					mover.forward.right();	
				}
			}
		}
		inputHelper.keysPressed.length = 0;

		for (var m = 0; m < this.movers.length; m++)
		{
			var mover = this.movers[m];
			mover.updateForTimerTick(this);
		}

		if (this.foods.length < this.movers.length)
		{
			this.foodSpawn();
		}

		Globals.Instance.displayHelper.drawLevel(this);
	}
}
