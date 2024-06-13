import "./style.css";

const canvas = document.querySelector("#game_canvas");
const ctx = canvas.getContext("2d");

const img_background = new Image();
img_background.src = "assets/background.png";

export const img_idle_fighter = new Image();
img_idle_fighter.src = "assets/default.png";

export const img_walk_right = new Image();
img_walk_right.src = "assets/default.png";

export const img_walk_left = new Image();
img_walk_left.src = "assets/default.png";

export const img_kick_right_middle = new Image();
img_kick_right_middle.src = "assets/kick.png";

const key = {
  a: { pressed: false },
  d: { pressed: false },
  j: { pressed: false },
};

window.addEventListener("keydown", function (evt) {
  console.log(evt);
  if (evt.key == "a") {
    key.a.pressed = true;
  }
  if (evt.key == "d") {
    key.d.pressed = true;
  }
  if (evt.key == "j") {
    key.j.pressed = true;
  }
});
window.addEventListener("keyup", function (evt) {
  console.log(evt);
  if (evt.key == "a") {
    key.a.pressed = false;
    fighter.state = "idle";
  }
  if (evt.key == "d") {
    key.d.pressed = false;
    fighter.state = "idle";
  }
  if (evt.key == "j") {
    key.j.pressed = false;
    fighter.state = "idle";
    console.log("evt.key");
  }
});

// function drawUI() {
//   ctx.font = "28px Arial";
//   ctx.fillStyle = "white";
//   // ctx.fillText("reset", 1045, 765);
// }

class Character {
  constructor({ img, pos }) {
    this.img = img;
    this.pos = pos;
    this.frame = 0;
    this.maxframes = 3;
    this.frameReplayWidth = 52;
    this.state = "img_walk_right";
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frame * this.frameReplayWidth, // position X source // frameWidth to replay
      0, // positi on Y source
      this.frameReplayWidth, // Width source
      67, // Height source
      this.pos.x, // destination X
      this.pos.y, // destionaton Y
      90, // destnation Width
      150 // destionastion Height
    );

    if (key.d.pressed) {
      this.pos.x += 16;
      if (this.pos.x >= 1035) this.pos.x = 1035;
      this.state = "walk_r";
    } else if (key.a.pressed) {
      this.pos.x -= 16;
      if (this.pos.x <= 0) this.pos.x = 0;
      this.state = "walk_l";
    }
    if (key.j.pressed) {
      this.pos.x += 0;
      if (this.pos.x >= 1035) this.pos.x = 1035;
      this.state = "kick_r";
    }

    if (this.state == "walk_r") {
      this.img = img_walk_right;
      if (this.frame < this.maxframes) {
        this.frame++;
        this.maxframes = 3;
        this.frameReplayWidth = 52;
      } else this.frame = 0;
    }
    if (this.state == "walk_l") {
      this.img = img_walk_left;
      if (this.frame < this.maxframes) {
        this.frame++;
        this.maxframes = 3;
        this.frameReplayWidth = 52;
      } else this.frame = 0;
    }
    if (this.state == "kick_r") {
      this.img = img_kick_right_middle;
      if (this.frame < this.maxframes) {
        this.frame++;
        this.frameReplayWidth = 67;
        this.maxframes = 2;
      } else {
        this.frame = 0;
      }
    }
  }
}

const fighter = new Character({
  img: img_idle_fighter,
  pos: {
    x: 150,
    y: 530,
  },
});

///////////////////////////////////////////

let then = Date.now();
let fps = 10;
const fpsInterval = 1000 / fps;

export function animate() {
  requestAnimationFrame(animate);

  const now = Date.now();
  const diffrence = now - then;

  if (diffrence > fpsInterval) {
    then = now - (diffrence % fpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_background, 0, 0);
    fighter.draw();
    // drawUI();
  }
}
animate();
