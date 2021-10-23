
class Globals
{
	static Instance = new Globals();

	// methods

	initialize
	(
		millisecondsPerTimerTick, viewSizeInPixels, level
	)
	{
		this.displayHelper = new DisplayHelper();
		this.inputHelper = new InputHelper();

		this.displayHelper.initialize(viewSizeInPixels);

		this.level = level;
		this.level.initialize();

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);

		this.inputHelper.initialize();
	}

	// events

	handleEventTimerTick()
	{
		this.level.updateForTimerTick();
	}
}
