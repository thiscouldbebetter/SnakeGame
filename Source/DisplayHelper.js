
class DisplayHelper
{
	// constants

	static ColorBackground = "Black";
	static ColorBorder = "Gray";
	static ColorFood = "Red"
	static ColorMover = "LightGreen";

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
		this.drawLevel_Food(level, level.food);
		this.drawLevel_Mover(level, level.mover);
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

		this.graphics.strokeStyle = DisplayHelper.ColorMover;
		this.graphics.beginPath();

		var cellPositionsOccupied = mover.cellPositionsOccupied;

		var drawPos = new Coords().overwriteWith
		(
			cellPositionsOccupied[0]
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

		this.graphics.stroke();
	}

	drawLevel_Status(level)
	{
		var cellSizeInPixels = this.viewSizeInPixels.clone().divide
		(
			level.sizeInCells
		);

		var moverLength = level.mover.cellPositionsOccupied.length - 1;
		this.graphics.fillStyle = DisplayHelper.ColorBorder;
		this.graphics.fillText
		(
			"" + moverLength, 
			cellSizeInPixels.x, cellSizeInPixels.y * 2
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

