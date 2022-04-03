import { Mouse } from './mouse.js';
import { Particle, maxJointDistance } from './particle.js';
import { ColorSet } from './color-set.js';

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
	const particleCount: number = canvas.width * canvas.height / 5000;
	for(let i=0; i < particleCount; ++i) {
		let radius: number = Math.random() * 5 + 1;
		let x: number = Math.random() * ((canvas.width  - radius*2) - radius*2) + radius*2;
		let y: number = Math.random() * ((canvas.height - radius*2) - radius*2) + radius*2;
		let dir_x: number = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);
		let dir_y: number = (Math.round(Math.random()) * 2 - 1) * ((Math.random() + 1.0) / 2);

		const color: Map<string, number> = new Map<string, number>();
		color.set(colorSet.mainColor, Math.random() * 50 + 155);
		color.set(colorSet.secondaryColor, Math.random() * 50 + 50);
		color.set(colorSet.interactiveColor, 0);

		particles.push(new Particle(x, y, dir_x, dir_y, radius, color));
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

function Frame(time: DOMHighResTimeStamp): void {
	let dt: number = (time - previousTime) / 1000;
	if(dt > 0.2) dt = 0.2; // Limit the dt to 0.2 seconds

	previousTime = time;
	
	if(!isNaN(dt)) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		/* Joints rendering */
		if(jointsEnabled) {
			particles.forEach((p1) => {
				particles.forEach((p2) => {
					if(p1 != p2) {
						const dx: number = p1.x - p2.x;
						const dy: number = p1.y - p2.y;
						const dist: number = Math.sqrt(dx*dx + dy*dy) - p1.radius - p2.radius;

						if(dist <= maxJointDistance) {
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

			/* Mouse interaction */
			if(mouse.active) {
				let dx: number = mouse.x - p.x;
				let dy: number = mouse.y - p.y;
				let dist: number = Math.sqrt(dx*dx + dy*dy);
				let maxDist: number = mouse.radius + p.radius;

				if(dist <= maxDist) {
					p.color.set(colorSet.interactiveColor, ((maxDist - dist) / maxDist * 255));
				} else {
					p.color.set(colorSet.interactiveColor, 0);
				}
			}

			p.draw(ctx);
		});
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

export function BackgroundParticlesJointsSettingCallback(value: unknown): void {
	jointsEnabled = value as boolean;
}

export function BackgroundParticlesColorSettingCallback(value: unknown): void {
	colorSet.mainColor = value as string;

	switch(value as string) {
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
