export class Mouse {
	public x: number;
	public y: number;
	public radius: number;
	public active: boolean;

	public constructor(radius: number) {
		this.x = 0;
		this.y = 0;
		this.radius = radius;
		this.active = false;
	}
}
