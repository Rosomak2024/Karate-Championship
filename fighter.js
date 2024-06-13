import { key } from "./events";
import {
  img_idle_fighter,
  img_walk_left,
  img_walk_right,
  img_kick_right_middle,
} from "./gameImages";

const canvasElement = document.querySelector("#game_canvas");
const canvasContext = canvasElement.getContext("2d");

class Fighter {
  constructor({ img, pos }) {
    this.image = img;
    this.position = pos;
    this.currentFrame = 0;
    this.maxframes = 3;
    this.frameWidth = 52;
    this.frameHeight = 67;
    this.state = "idle";
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      this.currentFrame * this.frameWidth, // X position in source image
      0, // Y position in source image
      this.frameWidth, // Width of source image
      this.frameHeight, // Height of source image
      this.position.x, // X position on canvas
      this.position.y, // Y position on canvas
      90, // Width on canvas
      150 // Height on canvas
    );

    if (key.d.pressed) {
      this.position.x += 16;
      if (this.position.x >= 1035) this.position.x = 1035;
      this.state = "walking_right";
    } else if (key.a.pressed) {
      this.position.x -= 16;
      if (this.position.x <= 0) this.position.x = 0;
      this.state = "walking_left";
    } else if (key.f.pressed) {
      this.position.x += 0;
      // if (this.position.x >= 1035) this.position.x = 1035;
      this.state = "kicking_right";
    } else if (key.w.pressed) {
      this.position.y -= 16;
      if (this.position.y >= 600) this.position.y += 16;
      this.state = "idle";
    }
    // if ((this.position.y = 600)) this.position.y = 530;

    if (this.state == "walking_right") {
      this.image = img_walk_right;
      if (this.currentFrame < this.maxframes) {
        this.currentFrame++;
      } else this.currentFrame = 0;
    }
    if (this.state == "walking_left") {
      this.image = img_walk_left;
      if (this.currentFrame < this.maxframes) {
        this.currentFrame++;
      } else this.currentFrame = 0;
    }
    if (this.state == "kicking_right") {
      this.image = img_kick_right_middle;
      if (this.currentFrame < this.maxframes) {
        this.currentFrame++;
        this.frameWidth = 70;
        this.frameHeight = 67;
        this.maxframes = 2;
      } else {
        this.currentFrame = 0;
      }
    }
    if (this.state == "jump") {
      this.image = img_idle_fighter;
      if (this.currentFrame < this.maxframes) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}

const fighter = new Fighter({
  img: img_idle_fighter,
  pos: {
    x: 150,
    y: 530,
  },
});

export { canvasElement, canvasContext, Fighter, fighter };
