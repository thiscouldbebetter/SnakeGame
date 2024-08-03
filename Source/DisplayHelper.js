
class DisplayHelper
{
	// constants

	static ColorBackground = "Black";
	static ColorBorder = "Gray";
	static ColorFood = "Red"

	// methods

	clear()
	{
		this.graphics.fillStyle = DisplayHelper.ColorBackground;
		this.graphics.fillRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);

		this.graphics.strokeStyle = DisplayHelper.ColorBorder;
		this.graphics.strokeRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);
	}

	drawLevel(level)
	{
		this.clear();

		var foods = level.foods;
		for (var f = 0; f < foods.length; f++)
		{
			var food = foods[f];
			this.drawLevel_Food(level, food);
		}

		var movers = level.movers;
		for (var m = 0; m < movers.length; m++)
		{
			var mover = movers[m];
			this.drawLevel_Mover(level, mover);
		}
		
		this.drawLevel_Status(level);
	}

	drawLevel_Food(level, food)
	{
		var cellSizeInPixels = this.viewSizeInPixels.clone().divide
		(
			level.sizeInCells
		);
		var cellSizeInPixelsHalf = cellSizeInPixels.clone().divideScalar(2);

		var drawPos = food.pos.clone().multiply
		(
			cellSizeInPixels
		);

		this.graphics.fillStyle = DisplayHelper.ColorFood;
		this.graphics.fillRect
		(
			drawPos.x, drawPos.y, 
			cellSizeInPixels.x, cellSizeInPixels.y
		);
	}

	drawLevel_Mover(level, mover)
	{
		var cellSizeInPixels = this.viewSizeInPixels.clone().divide
		(
			level.sizeInCells
		);
		var cellSizeInPixelsHalf = cellSizeInPixels.clone().divideScalar(2);

		this.graphics.strokeStyle = mover.color;
		this.graphics.beginPath();

		var cellPositionsOccupied = mover.cellPositionsOccupied;
		var cellPosOccupied0 = cellPositionsOccupied[0];

		var drawPos = new Coords().overwriteWith
		(
			cellPosOccupied0
		).multiply
		(
			cellSizeInPixels
		).add
		(
			cellSizeInPixelsHalf
		);

		this.graphics.moveTo(drawPos.x, drawPos.y);

		for (var i = 1; i < cellPositionsOccupied.length; i++)
		{
			var cellPos = cellPositionsOccupied[i];
			
			drawPos.overwriteWith
			(
				cellPos
			).multiply
			(
				cellSizeInPixels
			).add
			(
				cellSizeInPixelsHalf
			);
			this.graphics.lineTo(drawPos.x, drawPos.y);
		}

		this.graphics.lineWidth = cellSizeInPixels.x;
		this.graphics.stroke();
	}

	drawLevel_Status(level)
	{
		var cellSizeInPixels = this.viewSizeInPixels.clone().divide
		(
			level.sizeInCells
		);

		var movers = level.movers;
		var moverLengths = level.movers.map(x => x.length());
		var moverLengthsConcatenated = moverLengths.join("        ");

		this.graphics.fillStyle = DisplayHelper.ColorBorder;
		this.graphics.fillText
		(
			"" + moverLengthsConcatenated, 
			cellSizeInPixels.x, cellSizeInPixels.y * 3
		);

	}

	initialize(viewSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSizeInPixels.x;
		canvas.height = this.viewSizeInPixels.y;
		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);

		this.graphics = canvas.getContext("2d");
	}
}

