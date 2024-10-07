import Circle from "./class/Circle";
import Tweens from "./class/Tweens";
import MainLoop from "./utils/MainLoop";

const tweens = new Tweens();

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const circles = [];
for (let i = 0; i < 1; i++) {
  circles.push(new Circle({
    x: 20,
    y: 400,
    radius: 20,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  }));
}

tweens.create({
  duration: 1000,
  from: circles[0].y,
  to: 100,
  easing: 'quad',
  animate: (progress) => {
    circles[0].y = progress;
    console.log(progress);
  }
});

tweens.create({
  duration: 2000,
  from: circles[0].radius,
  to: 100,
  animate: (progress) => circles[0].radius = progress,
});

MainLoop.setSimulationTimestep(1000 / 120);
MainLoop.setUpdate((dt) => {
  tweens.update(dt);
});
MainLoop.setDraw(() => {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const c of circles) c.draw(ctx);
});
MainLoop.setEnd((fps, panic) => {
  if (panic) {
    MainLoop.resetFrameDelta();
    console.warn('panic!');
  }
});
MainLoop.start();