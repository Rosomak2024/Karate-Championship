import {
  canvas,
  ctx,
  img_walk_right,
  img_walk_left,
  img_kick_right_middle,
} from "./main.js";

// const img_idl_img_idle_fightere_second = new Image();
// img_idl_img_idle_fightere_second.src = "assets/default.png"; // pozmieniać pliki graficzne w drugą stronę

// const img_walk_r_second = new Image();
// img_walk_r_second.src = "assets/default.png";

// const img_walk_l_second = new Image();
// img_walk_l_second.src = "assets/default.png";

// const img_kick_r_second = new Image();
// img_kick_r_second.src = "assets/kick.png";

export const key = {
  l: { pressed: false },
  k: { pressed: false },
  m: { pressed: false },
};

window.addEventListener("keydown", function (evt) {
  console.log(evt);
  if (evt.key == "l") {
    key.l.pressed = true;
  }
  if (evt.key == "k") {
    key.k.pressed = true;
  }
  if (evt.key == "m") {
    key.m.pressed = true;
  }
});

window.addEventListener("keyup", function (evt) {
  console.log(evt);
  if (evt.key == "l") {
    key.l.pressed = false;
    fighter2.state = "idle";
  }
  if (evt.key == "k") {
    key.k.pressed = false;
    fighter2.state = "idle";
  }
  if (evt.key == "m") {
    key.l.pressed = false;
    fighter2.state = "idle";
    console.log("evt.key");
  }
});

export class Character2 {
  constructor({ img, pos }) {
    this.img = img;
    this.pos = pos;
    this.frame = 0;
    this.maxframes = 3;
    this.frameReplayWidth = 52;
    this.state = "img_walk_right";
  }

  draw2() {
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

    if (key.l.pressed) {
      // tu skonczyłęm wklejać zmeinic od tej lini wszytsko
      this.pos.x = 16;
      if (this.pos.x >= 1035) this.pos.x = 1035;
      this.state = "walk_r";
    } else if (key.k.pressed) {
      this.pos.x -= 16;
      if (this.pos.x <= 0) this.pos.x = 0;
      this.state = "walk_l";
    }
    if (key.k.pressed) {
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
