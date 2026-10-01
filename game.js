const player = document.getElementById("player");

let x = 50;
let y = 50;

function move(dx, dy) {
  x += dx * 2;
  y += dy * 2;

  x = Math.max(2, Math.min(98, x));
  y = Math.max(2, Math.min(98, y));

  player.style.left = x + "%";
  player.style.top = y + "%";
}
