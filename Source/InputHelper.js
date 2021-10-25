
class InputHelper
{
	constructor()
	{
		this.keysPressed = [];
	}
	
	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		var keyPressed = event.key;
		if (this.keysPressed.indexOf(keyPressed) == -1)
		{
			this.keysPressed.push(event.key);
		}
	}
	
	handleEventKeyUp(event)
	{
		var keyReleased = event.key;
		var indexOfKeyReleased = this.keysPressed.indexOf(keyReleased);
		if (indexOfKeyReleased >= 0)
		{
			this.keysPressed.splice(indexOfKeyReleased, 1);
		}
	}

}
