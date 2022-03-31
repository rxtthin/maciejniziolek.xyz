import { Mouse } from './mouse.js';
import { Particle } from './particle.js';
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = new Mouse(300);
let frameCallbackID;
let previousTime;
window.addEventListener('mousemove', (ev) => {
    mouse.active = true;
    mouse.x = ev.x;
    mouse.y = ev.y;
});
window.addEventListener('resize', () => {
    UpdateCanvasSize();
    InitParticles();
});
function UpdateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function InitParticles() {
    particles = [];
    const particleCount = canvas.width * canvas.height / 9000;
    for (let i = 0; i < particleCount; ++i) {
        let radius = Math.random() * 5 + 1;
        let x = Math.random() * ((canvas.width - radius * 2) - radius * 2) + radius * 2;
        let y = Math.random() * ((canvas.height - radius * 2) - radius * 2) + radius * 2;
        let dir_x = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
        let dir_y = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
        let red = 0;
        let green = Math.random() * 55 + 150;
        let blue = Math.random() * 55 + 50;
        particles.push(new Particle(x, y, dir_x, dir_y, radius, red, green, blue));
    }
}
function Init() {
    canvas.style.visibility = 'visible';
    UpdateCanvasSize();
    InitParticles();
    window.cancelAnimationFrame(frameCallbackID);
    frameCallbackID = window.requestAnimationFrame(Frame);
}
function Frame(time) {
    let dt = (time - previousTime) / 1000;
    if (dt < 0.2)
        dt = 0.2;
    previousTime = time;
    if (!isNaN(dt)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; ++i) {
            particles[i].update(dt, canvas, mouse);
            particles[i].draw(ctx);
        }
    }
    frameCallbackID = window.requestAnimationFrame(Frame);
}
export function BackgroundParticlesSettingCallback(value) {
    if (value) {
        Init();
    }
    else {
        canvas.style.visibility = 'hidden';
    }
}
