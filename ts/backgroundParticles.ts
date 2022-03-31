import { Mouse } from './mouse.js';
import { Particle } from './particle.js';

const canvas: HTMLCanvasElement = document.getElementById('background-canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
let particles: Particle[] = [];
let mouse: Mouse = new Mouse(300);
let frameCallbackID: number;
let previousTime: number;

window.addEventListener('mousemove', (ev): void => {
	mouse.active = true;
	mouse.x = ev.x;
	mouse.y = ev.y;
});

window.addEventListener('resize', (): void => {
	UpdateCanvasSize();
	InitParticles();
});

function UpdateCanvasSize(): void {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function InitParticles(): void {
	particles = [];
	const particleCount: number = canvas.width * canvas.height / 9000;
	for(let i=0; i < particleCount; ++i) {
		let radius: number = Math.random() * 5 + 1;
		let x: number = Math.random() * ((canvas.width  - radius*2) - radius*2) + radius*2;
		let y: number = Math.random() * ((canvas.height - radius*2) - radius*2) + radius*2;
		let dir_x: number = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
		let dir_y: number = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);

		let red: number = 0;
		let green: number = Math.random() * 55 + 150;
		let blue: number = Math.random() * 55 + 50;

		particles.push(new Particle(x, y, dir_x, dir_y, radius, red, green, blue));
	}
}

function Init(): void {
	canvas.style.visibility = 'visible';
	UpdateCanvasSize();
	InitParticles();

	window.cancelAnimationFrame(frameCallbackID);
	frameCallbackID = window.requestAnimationFrame(Frame); 
}

function Frame(time: DOMHighResTimeStamp): void {
	let dt: number = (time - previousTime) / 1000;
	if(dt < 0.2) dt = 0.2; // Limit the dt to 0.2 seconds

	previousTime = time;
	
	if(!isNaN(dt)) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(let i=0; i < particles.length; ++i) {
			particles[i].update(dt, canvas, mouse);
			particles[i].draw(ctx);
		}	
	}

	frameCallbackID = window.requestAnimationFrame(Frame); 
}

export function BackgroundParticlesSettingCallback(value: unknown): void {
	if(value as boolean) {
		Init();
	} else {
		canvas.style.visibility = 'hidden';
	}
}
