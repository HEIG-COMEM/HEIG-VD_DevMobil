import { TAU } from "../utils/math.js";

export default class Circle {
	constructor({
		x = 0,
		y = 0,
		radius = 100,
		color = "tomato",
		speed = 1000,
		direction = TAU / 4,
	} = {}) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.speed = speed;
		this.direction = direction;
	}

	setDir(angle) {
		this.direction = angle;
	}

	move(dt, width, height) {
		const dx = (this.speed * Math.cos(this.direction) * dt) / 1000;
		const dy = (this.speed * Math.sin(this.direction) * dt) / 1000;
		this.x += dx;
		this.y += dy;

		if (this.x + this.radius < 0) this.x = width + this.radius;
		if (this.x - this.radius > width) this.x = -this.radius;
		if (this.y + this.radius < 0) this.y = height + this.radius;
		if (this.y - this.radius > height) this.y = -this.radius;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, TAU);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}
