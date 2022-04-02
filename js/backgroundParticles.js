import { Mouse } from './mouse.js';
import { Particle, maxJointDistance } from './particle.js';
import { ColorSet } from './colorSet.js';
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
const mouse = new Mouse(300);
let particles = [];
let jointsEnabled = true;
let frameCallbackID;
let previousTime;
let colorSet = new ColorSet('', '', '');
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
    const particleCount = canvas.width * canvas.height / 5000;
    for (let i = 0; i < particleCount; ++i) {
        let radius = Math.random() * 5 + 1;
        let x = Math.random() * ((canvas.width - radius * 2) - radius * 2) + radius * 2;
        let y = Math.random() * ((canvas.height - radius * 2) - radius * 2) + radius * 2;
        let dir_x = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
        let dir_y = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
        const color = new Map();
        color.set(colorSet.mainColor, Math.random() * 50 + 155);
        color.set(colorSet.secondaryColor, Math.random() * 50 + 50);
        color.set(colorSet.interactiveColor, 0);
        particles.push(new Particle(x, y, dir_x, dir_y, radius, color));
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
    if (dt > 0.2)
        dt = 0.2;
    previousTime = time;
    if (!isNaN(dt)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (jointsEnabled) {
            particles.forEach((p1) => {
                particles.forEach((p2) => {
                    if (p1 != p2) {
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy) - p1.radius - p2.radius;
                        if (dist <= maxJointDistance) {
                            ctx.beginPath();
                            ctx.lineWidth = 0.2;
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                            ctx.stroke();
                        }
                    }
                });
            });
        }
        particles.forEach((p) => {
            p.update(dt, canvas);
            if (mouse.active) {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let maxDist = mouse.radius + p.radius;
                if (dist <= maxDist) {
                    p.color.set(colorSet.interactiveColor, ((maxDist - dist) / maxDist * 255));
                }
                else {
                    p.color.set(colorSet.interactiveColor, 0);
                }
            }
            p.draw(ctx);
        });
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
export function BackgroundParticlesJointsSettingCallback(value) {
    jointsEnabled = value;
}
export function BackgroundParticlesColorCallback(value) {
    colorSet.mainColor = value;
    switch (value) {
        case 'red':
            colorSet.secondaryColor = 'green';
            colorSet.interactiveColor = 'blue';
            break;
        case 'green':
            colorSet.secondaryColor = 'blue';
            colorSet.interactiveColor = 'red';
            break;
        case 'blue':
            colorSet.secondaryColor = 'green';
            colorSet.interactiveColor = 'red';
            break;
    }
    Init();
}
