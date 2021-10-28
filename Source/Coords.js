
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	equals(other)
	{
		var returnValue = 
		(
			this.x == other.x
			&& this.y == other.y
		);
		return returnValue;
	}

	floor()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	isInRange(max)
	{
		var returnValue = 
		(
			this.x >= 0
			&& this.x <= max.x
			&& this.y >= 0
			&& this.y <= max.y
		);

		return returnValue;
	}

	left()
	{
		var yPrev = this.y;
		this.y = 0 - this.x;
		this.x = yPrev;
		return this;
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	normalize()
	{
		return this.divideScalar(this.magnitude());
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	randomize()
	{
		this.x = Math.random();
		this.y = Math.random();
		return this;
	}

	right()
	{
		var yPrev = this.y;
		this.y = this.x;
		this.x = 0 - yPrev;
		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}
}

