const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");

const healthText = document.getElementById("health");
const ammoText = document.getElementById("ammo");
const weaponText = document.getElementById("weapon");
const enemyCountText = document.getElementById("enemyCount");
const message = document.getElementById("message");
const safeZone = document.getElementById("safeZone");

let x = 50;
let y = 50;

let health = 100;

let enemyCount = enemies.length;

let weaponIndex = 0;

let weapons = [
  {
    name: "Pistol",
    damage: 40,
    magazine: 12,
    range: 12
  },
  {
    name: "SMG",
    damage: 25,
    magazine: 25,
    range: 18
  },
  {
    name: "Shotgun",
    damage: 80,
    magazine: 5,
    range: 8
  }
];

let ammo = weapons[weaponIndex].magazine;


/* =========================
   MOVEMENT
========================= */

function move(dx, dy) {

  x += dx * 2;
  y += dy * 2;

  x = Math.max(2, Math.min(98, x));
  y = Math.max(2, Math.min(98, y));

  player.style.left = x + "%";
  player.style.top = y + "%";
}


/* =========================
   WEAPON
========================= */

function updateWeapon() {

  let weapon = weapons[weaponIndex];

  weaponText.textContent = weapon.name;

  ammo = weapon.magazine;

  ammoText.textContent = ammo;
}


function changeWeapon() {

  weaponIndex++;

  if (weaponIndex >= weapons.length) {
    weaponIndex = 0;
  }

  updateWeapon();

  message.textContent =
    "Weapon: " + weapons[weaponIndex].name;

  setTimeout(() => {
    message.textContent = "";
  }, 1200);
}


/* =========================
   SHOOT
========================= */

function shoot() {

  if (ammo <= 0) {

    message.textContent =
      "Ammo khatam! Reload karo.";

    return;
  }

  ammo--;

  ammoText.textContent = ammo;

  let weapon = weapons[weaponIndex];

  let closestEnemy = null;

  let closestDistance = Infinity;

  enemies.forEach(enemy => {

    if (enemy.style.display === "none") {
      return;
    }

    let enemyX =
      parseFloat(enemy.style.left);

    let enemyY =
      parseFloat(enemy.style.top);

    let distance = Math.hypot(
      x - enemyX,
      y - enemyY
    );

    if (
      distance < closestDistance &&
      distance <= weapon.range
    ) {

      closestDistance = distance;

      closestEnemy = enemy;
    }
  });

  if (closestEnemy) {

    closestEnemy.style.display = "none";

    enemyCount--;

    enemyCountText.textContent =
      enemyCount;

    message.textContent =
      weapon.name + " hit! Enemy eliminated.";

    if (enemyCount === 0) {

      message.textContent =
        "🏆 Victory! All enemies eliminated!";
    }

  } else {

    message.textContent = "Miss!";
  }

  setTimeout(() => {
    message.textContent = "";
  }, 1000);
}


/* =========================
   RELOAD
========================= */

function reload() {

  let weapon = weapons[weaponIndex];

  ammo = weapon.magazine;

  ammoText.textContent = ammo;

  message.textContent = "Reloaded!";

  setTimeout(() => {
    message.textContent = "";
  }, 800);
}


/* =========================
   ENEMY ATTACK
========================= */

function enemyAttack() {

  if (enemyCount === 0) {
    return;
  }

  let damage = 5;

  health -= damage;

  if (health < 0) {
    health = 0;
  }

  healthText.textContent = health;

  if (health === 0) {

    message.textContent =
      "💀 You died!";

    setTimeout(() => {
      location.reload();
    }, 1500);
  }
}


/* =========================
   SAFE ZONE
========================= */

let zoneSize = 75;

function shrinkSafeZone() {

  zoneSize -= 2;

  if (zoneSize < 25) {
    zoneSize = 25;
  }

  safeZone.style.width =
    zoneSize + "%";

  safeZone.style.height =
    zoneSize + "%";

  safeZone.style.left =
    ((100 - zoneSize) / 2) + "%";

  safeZone.style.top =
    ((100 - zoneSize) / 2) + "%";
}


/* =========================
   OUTSIDE ZONE DAMAGE
========================= */

function zoneDamage() {

  let centerX = 50;
  let centerY = 50;

  let distance = Math.hypot(
    x - centerX,
    y - centerY
  );

  let allowedDistance =
    zoneSize / 2;

  if (distance > allowedDistance) {

    health -= 3;

    if (health < 0) {
      health = 0;
    }

    healthText.textContent =
      health;

    message.textContent =
      "⚠️ Safe Zone ke bahar ho!";
  }
}


/* =========================
   GAME TIMERS
========================= */

setInterval(enemyAttack, 2000);

setInterval(shrinkSafeZone, 5000);

setInterval(zoneDamage, 1000);


/* =========================
   START
========================= */

updateWeapon();
