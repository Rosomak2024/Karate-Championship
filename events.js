import { fighter } from "./fighter";

const key = {
  a: { pressed: false },
  d: { pressed: false },
  f: { pressed: false },
  w: { pressed: false },
};

window.addEventListener("keydown", function (evt) {
  console.log(evt);
  if (evt.key == "a") {
    key.a.pressed = true;
  }
  if (evt.key == "d") {
    key.d.pressed = true;
  }
  if (evt.key == "f") {
    key.f.pressed = true;
  }
  if (evt.key == "w") {
    key.w.pressed = true;
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
  if (evt.key == "f") {
    key.f.pressed = false;
    fighter.state = "idle";
    console.log("evt.key");
  }
  if (evt.key == "w") {
    key.f.pressed = false;
    fighter.state = "idle";
    console.log("evt.key");
  }
});
export { key };
