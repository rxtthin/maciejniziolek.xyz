import { Mouse } from './mouse.js'

const moveSpeed: number = 20;

export class Particle {
	public x: number;
	public y: number;
	public dir_x: number;
	public dir_y: number;
	public radius: number;
	public color = {
		red: 0,
		green: 0,
		blue: 0,
	};

	public constructor(x: number, y: number, dir_x: number, dir_y: number, radius: number, red: number, green: number, blue: number) {
		this.x = x;
		this.y = y;
		this.dir_x = dir_x;
		this.dir_y = dir_y;
		this.radius = radius;
		this.color.red = red;
		this.color.green = green;
		this.color.blue = blue;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue}`;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}

	public update(dt: number, canvas: HTMLCanvasElement, mouse: Mouse): void {
		/* Right wall */
		if(this.x + this.radius > canvas.width) {
			this.x = canvas.width - this.radius;
			this.dir_x *= -1; 
		} 
		/* Left wall */
		else if(this.x < this.radius) {
			this.x = this.radius;
			this.dir_x *= -1; 
		}
		/* Top wall */
		if(this.y + this.radius > canvas.height) {
			this.y = canvas.height - this.radius;
			this.dir_y *= -1;
		}
		/* Bottom wall */
		else if(this.y < this.radius) {
			this.y = this.radius;
			this.dir_y *= -1;
		}

		if(mouse.active) {
			let delta_x: number = mouse.x - this.x;
			let delta_y: number = mouse.y - this.y;
			let dist: number = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
			let maxDist: number = mouse.radius + this.radius;

			if(dist <= maxDist) {
				this.color.red = ((maxDist - dist) / maxDist * 255);
			} else {
				this.color.red = 0;
			}
		}

		this.x += this.dir_x * dt * moveSpeed;
		this.y += this.dir_y * dt * moveSpeed;
	}
}
