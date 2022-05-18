import { Vector2 } from './vector2.js';
import { Mouse } from './mouse.js';
import { Particle, maxJointDistance } from './particle.js';
import { ColorSet, colorSets } from './color-set.js';

const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
const mouse: Mouse = new Mouse(300);
let particles: Particle[] = [];
let jointsEnabled: boolean = true;
let frameCallbackID: number;
let previousTime: number;
let colorSet: ColorSet = new ColorSet('', '', '');

window.addEventListener('mousemove', (ev): void => {
	mouse.active = true;
	mouse.x = ev.x;
	mouse.y = ev.y;
});

window.addEventListener('mouseout', (): void => {
	mouse.active = false;
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
	const particleCount: number = Math.min(canvas.width * canvas.height / 9000, 100);
	for(let i=0; i < particleCount; ++i) {
		let radius: number = Math.random() * 5 + 1;

		let _RandPos = (max: number): number => Math.random() * ((max  - radius*2) - radius*2) + radius*2;
		let x: number = _RandPos(canvas.width);
		let y: number = _RandPos(canvas.height);

		let _RandDir = (): number => (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
		let dir_x: number = _RandDir();
		let dir_y: number = _RandDir();

		const color: Map<string, number> = new Map<string, number>();
		color.set(colorSet.mainColor, Math.random() * 50 + 155);
		color.set(colorSet.secondaryColor, Math.random() * 50 + 50);
		color.set(colorSet.interactiveColor, 0);

		particles.push(new Particle(new Vector2(x, y), new Vector2(dir_x, dir_y), radius, color));
	}
}

function Init(): void {
	document.body.appendChild(canvas);

	canvas.style.visibility = 'visible';
	UpdateCanvasSize();
	InitParticles();

	window.cancelAnimationFrame(frameCallbackID);
	frameCallbackID = window.requestAnimationFrame(Frame); 
}

function DrawJoint(p1: Particle, p2: Particle): void {
	const dx: number = p1.position.x- p2.position.x;
	const dy: number = p1.position.y - p2.position.y;
	const dist: number = Math.sqrt(dx*dx + dy*dy) - p1.radius - p2.radius;

	if(dist <= maxJointDistance) {
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(p1.position.x, p1.position.y);
		ctx.lineTo(p2.position.x, p2.position.y);
		ctx.strokeStyle = `rgba(255,255,255,${(1 - (dist / maxJointDistance)) * 100}%)`;
		ctx.stroke();
	}
}

function HandleMouseInteraction(p: Particle): void {
	/* Mouse interaction */
	if(mouse.active) {
		let dx: number = mouse.x - p.position.x;
		let dy: number = mouse.y - p.position.y;
		let dist: number = Math.sqrt(dx*dx + dy*dy);
		let maxDist: number = mouse.radius + p.radius;

		p.color.set(colorSet.interactiveColor, dist <= maxDist ? ((maxDist - dist) / maxDist * 255) : 0);
	} else {
		p.color.set(colorSet.interactiveColor, 0);
	}
}

function Frame(time: DOMHighResTimeStamp): void {
	let dt: number = (time - previousTime) / 1000;
	if(dt > 0.2) dt = 0.2;
	previousTime = time;
	
	if(!isNaN(dt)) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(jointsEnabled) {
			particles.forEach((p1) => {
				particles.forEach((p2) => {
					if(p1 != p2) {
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

export function BackgroundParticlesSettingCallback(value: boolean): void {
	value ? Init() : canvas.style.visibility = 'hidden';
}

export function BackgroundParticlesJointsSettingCallback(value: boolean): void {
	jointsEnabled = value as boolean;
}

export function BackgroundParticlesColorSettingCallback(value: string): void {
	colorSet = colorSets.get(value) as ColorSet;
	Init();
}
