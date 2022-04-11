import { Vector2 } from './vector2.js';
import { Mouse } from './mouse.js';
import { Particle, maxJointDistance } from './particle.js';
import { ColorSet, colorSets } from './color-set.js';
const canvas = document.createElement('canvas');
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
window.addEventListener('mouseout', () => {
    mouse.active = false;
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
    const particleCount = Math.min(canvas.width * canvas.height / 5000, 500);
    for (let i = 0; i < particleCount; ++i) {
        let radius = Math.random() * 5 + 1;
        let _RandPos = (max) => Math.random() * ((max - radius * 2) - radius * 2) + radius * 2;
        let x = _RandPos(canvas.width);
        let y = _RandPos(canvas.height);
        let _RandDir = () => (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
        let dir_x = _RandDir();
        let dir_y = _RandDir();
        const color = new Map();
        color.set(colorSet.mainColor, Math.random() * 50 + 155);
        color.set(colorSet.secondaryColor, Math.random() * 50 + 50);
        color.set(colorSet.interactiveColor, 0);
        particles.push(new Particle(new Vector2(x, y), new Vector2(dir_x, dir_y), radius, color));
    }
}
function Init() {
    document.body.appendChild(canvas);
    canvas.style.visibility = 'visible';
    UpdateCanvasSize();
    InitParticles();
    window.cancelAnimationFrame(frameCallbackID);
    frameCallbackID = window.requestAnimationFrame(Frame);
}
function DrawJoint(p1, p2) {
    const dx = p1.position.x - p2.position.x;
    const dy = p1.position.y - p2.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy) - p1.radius - p2.radius;
    if (dist <= maxJointDistance) {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.position.x, p1.position.y);
        ctx.lineTo(p2.position.x, p2.position.y);
        ctx.strokeStyle = `rgba(255,255,255,${(1 - (dist / maxJointDistance)) * 100}%)`;
        ctx.stroke();
    }
}
function HandleMouseInteraction(p) {
    if (mouse.active) {
        let dx = mouse.x - p.position.x;
        let dy = mouse.y - p.position.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let maxDist = mouse.radius + p.radius;
        if (dist <= maxDist) {
            p.color.set(colorSet.interactiveColor, ((maxDist - dist) / maxDist * 255));
        }
        else {
            p.color.set(colorSet.interactiveColor, 0);
        }
    }
    else {
        p.color.set(colorSet.interactiveColor, 0);
    }
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
                        DrawJoint(p1, p2);
                    }
                });
            });
        }
        particles.forEach((p) => {
            p.update(dt, canvas);
            HandleMouseInteraction(p);
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
export function BackgroundParticlesColorSettingCallback(value) {
    colorSet = colorSets.get(value);
    Init();
}
