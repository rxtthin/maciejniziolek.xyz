export class Vector2 {
	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public GetLength(): number {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	public Normalized(): Vector2 {
		let len: number = this.GetLength();
		let result: Vector2 = new Vector2(0,0);

		if(len != 0) {
			result.x /= len;
			result.y /= len;
		} else {
			result.x = 0;
			result.y = 0;
		}

		return result;
	}
}
