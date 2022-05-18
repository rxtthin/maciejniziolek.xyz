const moveSpeed = 100;
export const maxJointDistance = 50;
export class Particle {
    constructor(position, direction, radius, color) {
        this.color = new Map([
            ['red', 0],
            ['green', 0],
            ['blue', 0],
        ]);
        this.position = position;
        this.direction = direction;
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color.get('red')}, ${this.color.get('green')}, ${this.color.get('blue')}`;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    update(dt, canvas) {
        if (this.position.x + this.radius > canvas.width) {
            this.position.x = canvas.width - this.radius;
            this.direction.x *= -1;
        }
        else if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.direction.x *= -1;
        }
        if (this.position.y + this.radius > canvas.height) {
            this.position.y = canvas.height - this.radius;
            this.direction.y *= -1;
        }
        else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.direction.y *= -1;
        }
        this.position.x += this.direction.x * dt * moveSpeed;
        this.position.y += this.direction.y * dt * moveSpeed;
    }
}
