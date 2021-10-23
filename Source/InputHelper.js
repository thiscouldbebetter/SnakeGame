
class InputHelper
{
	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		this.keyCodePressed = event.keyCode;
	}
}
