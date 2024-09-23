import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import { TAU } from "./utils/math";

const ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const keyboard = new Keyboard();
const circles = [];
for (let i = 0; i < 100; i++) {
	const radius = Math.random() * 80;
	circles.push(
		new Circle({
			x: Math.random() * ctx.canvas.width,
			y: Math.random() * ctx.canvas.height,
			radius,
			color: `hsl(${Math.random() * 360}, 100%, 50%)`,
			speed: radius * 7,
			direction: 0,
		})
	);
}

circles.sort((a, b) => a.radius - b.radius);

function tick(timestamp) {
	const dt = timestamp - lastTickTime;
	lastTickTime = timestamp;

	// User input management
	let angle = false;
	if (keyboard.isKeyDown("KeyW")) {
		angle = (3 / 4) * TAU;
	} else if (keyboard.isKeyDown("KeyS")) {
		angle = (1 / 4) * TAU;
	}

	if (angle !== false) {
		for (const c of circles) {
			c.setDir(angle);
			c.move(dt, ctx.canvas.width, ctx.canvas.height);
		}
	}

	// Draw the world
	ctx.canvas.width = ctx.canvas.clientWidth;
	ctx.canvas.height = ctx.canvas.clientHeight;
	for (const c of circles) {
		c.draw(ctx);
	}

	// Game loop
	requestAnimationFrame(tick);
}

let lastTickTime = 0;
requestAnimationFrame(tick);
