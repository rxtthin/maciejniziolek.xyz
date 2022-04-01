const moveSpeed = 100;
export const maxJointDistance = 50;
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
