import "./style.css";
import { fighter, canvasContext, canvasElement } from "./fighter";
import { img_background } from "./gameImages";

let then = Date.now();
let fps = 10;
const fpsInterval = 1000 / fps;

function animateGame() {
  requestAnimationFrame(animateGame);

  const now = Date.now();
  const diffrence = now - then;

  if (diffrence > fpsInterval) {
    then = now - (diffrence % fpsInterval);

    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasContext.drawImage(img_background, 0, 0);
    fighter.draw();
    // drawUI();
  }
}
animateGame();
