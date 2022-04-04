import { Vector2 } from './vector2.js';

const moveSpeed: number = 100;
export const maxJointDistance: number = 50;

export class Particle {
	public position: Vector2;
	public direction: Vector2;
	public radius: number;

	// TODO: This solution might not be the best.
	public color: Map<string, number> = new Map<string, number>([
		['red', 0], 
		['green', 0],
		['blue', 0],
	]);

	public constructor(position: Vector2, direction: Vector2, radius: number, color: Map<string, number>) {
		this.position = position;
		this.direction = direction;
		this.radius = radius;
		this.color = color;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.fillStyle = `rgb(${this.color.get('red')}, ${this.color.get('green')}, ${this.color.get('blue')}`;
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}

	public update(dt: number, canvas: HTMLCanvasElement): void {
		/* Right wall */
		if(this.position.x + this.radius > canvas.width) {
			this.position.x = canvas.width - this.radius;
			this.direction.x *= -1; 
		} 
		/* Left wall */
		else if(this.position.x < this.radius) {
			this.position.x = this.radius;
			this.direction.x *= -1; 
		}
		/* Top wall */
		if(this.position.y + this.radius > canvas.height) {
			this.position.y = canvas.height - this.radius;
			this.direction.y *= -1;
		}
		/* Bottom wall */
		else if(this.position.y < this.radius) {
			this.position.y = this.radius;
			this.direction.y *= -1;
		}

		this.position.x += this.direction.x * dt * moveSpeed;
		this.position.y += this.direction.y * dt * moveSpeed;
	}
}
