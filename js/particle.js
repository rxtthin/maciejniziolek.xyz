import { particles, jointsEnabled } from './backgroundParticles.js';
const moveSpeed = 100;
const maxDist = 50;
export class Particle {
    constructor(x, y, dir_x, dir_y, radius, color) {
        this.color = new Map([
            ['red', 0],
            ['green', 0],
            ['blue', 0],
        ]);
        this.x = x;
        this.y = y;
        this.dir_x = dir_x;
        this.dir_y = dir_y;
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        if (jointsEnabled) {
            particles.forEach((p) => {
                if (p != this) {
                    const dx = p.x - this.x;
                    const dy = p.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= maxDist) {
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
    update(dt, canvas) {
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dir_x *= -1;
        }
        else if (this.x < this.radius) {
            this.x = this.radius;
            this.dir_x *= -1;
        }
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dir_y *= -1;
        }
        else if (this.y < this.radius) {
            this.y = this.radius;
            this.dir_y *= -1;
        }
        this.x += this.dir_x * dt * moveSpeed;
        this.y += this.dir_y * dt * moveSpeed;
    }
}
