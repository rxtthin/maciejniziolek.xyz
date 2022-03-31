const moveSpeed = 20;
export class Particle {
    constructor(x, y, dir_x, dir_y, radius, red, green, blue) {
        this.color = {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.x = x;
        this.y = y;
        this.dir_x = dir_x;
        this.dir_y = dir_y;
        this.radius = radius;
        this.color.red = red;
        this.color.green = green;
        this.color.blue = blue;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue}`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    update(dt, canvas, mouse) {
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
        if (mouse.active) {
            let delta_x = mouse.x - this.x;
            let delta_y = mouse.y - this.y;
            let dist = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
            let maxDist = mouse.radius + this.radius;
            if (dist <= maxDist) {
                this.color.red = ((maxDist - dist) / maxDist * 255);
            }
            else {
                this.color.red = 0;
            }
        }
        this.x += this.dir_x * dt * moveSpeed;
        this.y += this.dir_y * dt * moveSpeed;
    }
}
