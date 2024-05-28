import "./style.css";
const canvas = document.querySelector("#game_canvas");
const ctx = canvas.getContext("2d");

const img_back = new Image();
img_back.src = "assets/background.png";

const img_idle = new Image();
img_idle.src = "assets/default.png";

const img_walk_r = new Image();
img_walk_r.src = "assets/default.png";

const img_walk_l = new Image();
img_walk_l.src = "assets/default.png";

const img_kick_r = new Image();
img_kick_r.src = "assets/file.png";

const cursor = {
  x: 0,
  y: 0,
};

canvas.addEventListener("click", function (evt) {
  let game_rect = canvas.getBoundingClientRect();
  cursor.x = evt.clientX - game_rect.left;
  cursor.y = evt.clientY - game_rect.top;
});

const key = {
  a: { pressed: false },
  d: { pressed: false },
  j: { pressed: false },
};

// let current_key = "";

window.addEventListener("keydown", function (evt) {
  console.log(evt);
  if (evt.key == "a") {
    key.a.pressed = true;
    // current_key = "a";
  }
  if (evt.key == "d") {
    key.d.pressed = true;
    // current_key = "d";
  }
  if (evt.key == "j") {
    key.j.pressed = true;
    // current_key = "j";
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

function drawUI() {
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  // ctx.fillText("reset", 1045, 765);
}

class Character {
  constructor({ img, pos }) {
    this.img = img;
    this.pos = pos;
    this.frame = 0;
    this.maxframes = 3;
    this.frameReplayWidth = 52;
    this.state = "idle";
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frame * this.frameReplayWidth, // position X source // frameWidth to replay
      0, // position Y source
      52, // Width source
      63, // Height source
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
      this.img = img_walk_r;
      if (this.frame < this.maxframes) {
        this.frame++;
      } else this.frame = 0;
    }
    if (this.state == "walk_l") {
      this.img = img_walk_l;
      if (this.frame < this.maxframes) {
        this.frame++;
      } else this.frame = 0;
    }
    if (this.state == "kick_r") {
      this.img = img_kick_r;
      if (this.frame < this.maxframes) {
        this.frame++;
        this.frameReplayWidth = 68;
        this.maxframes = 2;
      } else {
        this.frame = 0;
      }
    }
  }
}

const fighter = new Character({
  img: img_idle,
  pos: {
    x: 150,
    y: 530,
  },
});
///////////////////////////////////////////

let then = Date.now();
let fps = 15;
const fpsInterval = 1000 / fps;

function animate() {
  requestAnimationFrame(animate);

  const now = Date.now();
  const diffrence = now - then;

  if (diffrence > fpsInterval) {
    then = now - (diffrence % fpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_back, 0, 0);
    fighter.draw();
    drawUI();
  }
}
animate();
