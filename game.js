const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const healthText = document.getElementById("health");
const ammoText = document.getElementById("ammo");

let x = 50;
let y = 50;

let health = 100;
let ammo = 10;

function move(dx, dy) {
  x += dx * 2;
  y += dy * 2;

  x = Math.max(2, Math.min(98, x));
  y = Math.max(2, Math.min(98, y));

  player.style.left = x + "%";
  player.style.top = y + "%";
}

function shoot() {

  if (ammo <= 0) {
    alert("Ammo khatam! Reload karo.");
    return;
  }

  ammo--;
  ammoText.textContent = ammo;

  const distance = Math.hypot(
    x - 75,
    y - 40
  );

  if (distance < 12) {
    enemy.style.display = "none";
    alert("Enemy eliminated!");
  }
}

function reload() {
  ammo = 10;
  ammoText.textContent = ammo;
}

function enemyAttack() {

  if (enemy.style.display === "none") {
    return;
  }

  health -= 5;

  if (health < 0) {
    health = 0;
  }

  healthText.textContent = health;

  if (health === 0) {
    alert("You died!");
    location.reload();
  }
}

setInterval(enemyAttack, 2000);
