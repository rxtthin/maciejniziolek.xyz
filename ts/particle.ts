import { particles, jointsEnabled } from './backgroundParticles.js'

const moveSpeed: number = 100;
const maxJointDistance: number = 50;

export class Particle {
	public x: number;
	public y: number;
	public dir_x: number;
	public dir_y: number;
	public radius: number;

	// TODO: This solution might not be the best.
	public color: Map<string, number> = new Map<string, number>([
		['red', 0], 
		['green', 0],
		['blue', 0],
	]);

	public constructor(x: number, y: number, dir_x: number, dir_y: number, radius: number, color: Map<string, number>) {
		this.x = x;
		this.y = y;
		this.dir_x = dir_x;
		this.dir_y = dir_y;
		this.radius = radius;
		this.color = color;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		if(jointsEnabled) {
			particles.forEach((p) => {
				if(p != this) {
					const dx: number = p.x - this.x;
					const dy: number = p.y - this.y;
					const dist: number = Math.sqrt(dx*dx + dy*dy);

					if(dist <= maxJointDistance) {
						ctx.beginPath();
						ctx.lineWidth = 0.3;
						ctx.moveTo(this.x, this.y);
						ctx.lineTo(p.x, p.y);
						ctx.strokeStyle = 'rgba(255,255,255,0.5)';
						ctx.stroke();
					}
				}
			});
		}

		ctx.beginPath();
		ctx.fillStyle = `rgb(${this.color.get('red')}, ${this.color.get('green')}, ${this.color.get('blue')}`;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}

	public update(dt: number, canvas: HTMLCanvasElement): void {
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

		this.x += this.dir_x * dt * moveSpeed;
		this.y += this.dir_y * dt * moveSpeed;
	}
}
