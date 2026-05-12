const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const blueScoreEl = document.getElementById('blueScore');
const redScoreEl = document.getElementById('redScore');
const clockEl = document.getElementById('clock');
const statusTextEl = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const modeCpuBtn = document.getElementById('modeCpuBtn');
const modeLocalBtn = document.getElementById('modeLocalBtn');
const difficultySwitcher = document.getElementById('difficultySwitcher');
const difficultyEasyBtn = document.getElementById('difficultyEasyBtn');
const difficultyNormalBtn = document.getElementById('difficultyNormalBtn');
const difficultyHardBtn = document.getElementById('difficultyHardBtn');
const tournamentSwitcher = document.getElementById('tournamentSwitcher');
const tourCasualBtn = document.getElementById('tourCasualBtn');
const tourBo3Btn = document.getElementById('tourBo3Btn');
const tourBo5Btn = document.getElementById('tourBo5Btn');
const muteBtn = document.getElementById('muteBtn');
const keybindsBtn = document.getElementById('keybindsBtn');
const closeKeybindsBtn = document.getElementById('closeKeybindsBtn');
const keybindPanel = document.getElementById('keybindPanel');
const bindHint = document.getElementById('bindHint');
const bindButtons = Array.from(document.querySelectorAll('.bind-btn'));
const blueStaminaEl = document.getElementById('blueStamina');
const redStaminaEl = document.getElementById('redStamina');
const seriesScoreEl = document.getElementById('seriesScore');
const mobileControlsEl = document.getElementById('mobileControls');
const touchButtons = Array.from(document.querySelectorAll('.touch-btn'));

const WORLD_WIDTH = canvas.width;
const WORLD_HEIGHT = canvas.height;
const FLOOR_Y = 472;
const GOAL_HEIGHT = 126;
const GOAL_TOP = FLOOR_Y - GOAL_HEIGHT;
const GOAL_BOTTOM = FLOOR_Y;
const GOAL_DEPTH = 58;
const GRAVITY = 0.58;
const FRICTION = 0.92;
const AIR_DRAG = 0.995;
const PLAYER_SPEED = 0.58;
const MAX_RUN_SPEED = 5.1;
const JUMP_SPEED = 11.7;
const KICK_RANGE = 60;
const BALL_RADIUS = 15;
const MATCH_LENGTH = 90;
const MAX_STAMINA = 100;
const REPLAY_SECONDS = 3;
const REPLAY_SPEED = 0.42;
const HISTORY_MAX = 260;

const AI_PROFILES = {
  easy: {
    maxAccel: PLAYER_SPEED * 1.15,
    interceptWindow: 6,
    kickPower: 0.72,
    kickCooldown: 0.78,
    kickRange: 58,
    jumpBoost: 0.9
  },
  normal: {
    maxAccel: PLAYER_SPEED * 1.55,
    interceptWindow: 9,
    kickPower: 0.9,
    kickCooldown: 0.56,
    kickRange: 66,
    jumpBoost: 0.95
  },
  hard: {
    maxAccel: PLAYER_SPEED * 1.95,
    interceptWindow: 12,
    kickPower: 1.05,
    kickCooldown: 0.4,
    kickRange: 72,
    jumpBoost: 1
  }
};

const defaultControls = {
  blue: { left: 'a', right: 'd', jump: 'w', kick: 'space' },
  red: { left: 'j', right: 'l', jump: 'i', kick: 'k' }
};

let controls = loadControls();
const keys = new Set();
const touchActions = new Set();
let awaitingBind = null;
let lastTime = performance.now();
let matchOver = false;
let goalPause = 0;
let timeRemaining = MATCH_LENGTH;
let blueScore = 0;
let redScore = 0;
let gameMode = 'cpu';
let difficulty = 'normal';
let tournamentMode = 'casual';
let seriesBlue = 0;
let seriesRed = 0;
let pendingNextMatch = false;
let nextMatchTimer = 0;

let replayActive = false;
let replayTimer = 0;
let replayFrames = [];
let replayIndex = 0;
let replayScorer = null;
let frameHistory = [];

let audioCtx = null;
let muted = false;
let lastPostSoundTime = 0;

const players = {
  blue: createPlayer(220, '#57b3ff', false),
  red: createPlayer(740, '#ff6a5e', true)
};

const ball = {
  x: WORLD_WIDTH / 2,
  y: 220,
  vx: 0,
  vy: 0,
  r: BALL_RADIUS
};

function createPlayer(x, color, isAi) {
  return {
    x,
    y: FLOOR_Y,
    vx: 0,
    vy: 0,
    color,
    isAi,
    jumpLock: false,
    kickCooldown: 0,
    facing: isAi ? -1 : 1,
    kickHeld: false,
    kickCharge: 0,
    stamina: MAX_STAMINA,
    aiDrift: 0,
    aiDriftTimer: 0
  };
}

function resetPlayer(player, x, facing) {
  player.x = x;
  player.y = FLOOR_Y;
  player.vx = 0;
  player.vy = 0;
  player.facing = facing;
  player.jumpLock = false;
  player.kickCooldown = 0;
  player.kickHeld = false;
  player.kickCharge = 0;
  player.stamina = MAX_STAMINA;
}

function resetRound(scorer = null) {
  resetPlayer(players.blue, 220, 1);
  resetPlayer(players.red, 740, -1);

  ball.x = WORLD_WIDTH / 2;
  ball.y = GOAL_TOP - 20;
  ball.vx = 0;
  ball.vy = 0;

  goalPause = 1.1;
  frameHistory = [];
  replayActive = false;
  replayScorer = null;

  if (scorer) {
    statusTextEl.textContent = `${capitalize(scorer)} scored!`;
  } else {
    statusTextEl.textContent = 'Kickoff ready.';
  }
}

function resetMatch() {
  blueScore = 0;
  redScore = 0;
  timeRemaining = MATCH_LENGTH;
  matchOver = false;
  pendingNextMatch = false;
  nextMatchTimer = 0;
  replayActive = false;
  updateHud();
  resetRound();
}

function resetCompetition() {
  seriesBlue = 0;
  seriesRed = 0;
  updateHud();
  resetMatch();
}

function updateHud() {
  blueScoreEl.textContent = String(blueScore);
  redScoreEl.textContent = String(redScore);
  clockEl.textContent = String(Math.max(0, Math.ceil(timeRemaining)));
  blueStaminaEl.textContent = String(Math.round(players.blue.stamina));
  redStaminaEl.textContent = String(Math.round(players.red.stamina));

  if (tournamentMode === 'casual') {
    seriesScoreEl.textContent = '-';
  } else {
    const target = getSeriesTarget();
    seriesScoreEl.textContent = `${seriesBlue}-${seriesRed} / ${target}`;
  }
}

function onGround(player) {
  return player.y >= FLOOR_Y - 0.001;
}

function setGameMode(mode) {
  gameMode = mode;
  players.red.isAi = mode === 'cpu';
  modeCpuBtn.classList.toggle('is-active', mode === 'cpu');
  modeLocalBtn.classList.toggle('is-active', mode === 'local');
  difficultySwitcher.classList.toggle('is-disabled', mode !== 'cpu');

  if (mode === 'cpu') {
    statusTextEl.textContent = `Playing 1 v CPU (${capitalize(difficulty)}).`;
  } else {
    statusTextEl.textContent = 'Playing 1 v 1.';
  }

  resetMatch();
}

function setDifficulty(level) {
  if (!AI_PROFILES[level]) {
    return;
  }

  difficulty = level;
  difficultyEasyBtn.classList.toggle('is-active', level === 'easy');
  difficultyNormalBtn.classList.toggle('is-active', level === 'normal');
  difficultyHardBtn.classList.toggle('is-active', level === 'hard');

  if (gameMode === 'cpu') {
    statusTextEl.textContent = `CPU difficulty: ${capitalize(level)}`;
    goalPause = Math.max(goalPause, 0.35);
  }
}

function getSeriesTarget() {
  if (tournamentMode === 'bo3') {
    return 2;
  }
  if (tournamentMode === 'bo5') {
    return 3;
  }
  return 0;
}

function setTournamentMode(mode) {
  tournamentMode = mode;
  tourCasualBtn.classList.toggle('is-active', mode === 'casual');
  tourBo3Btn.classList.toggle('is-active', mode === 'bo3');
  tourBo5Btn.classList.toggle('is-active', mode === 'bo5');
  statusTextEl.textContent = mode === 'casual' ? 'Casual match mode.' : `Tournament mode: ${mode.toUpperCase()}`;
  resetCompetition();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function resolveCircleCollision(cx, cy, radius, object, bumpPower = 1) {
  const dx = ball.x - cx;
  const dy = ball.y - cy;
  const dist = Math.hypot(dx, dy);
  const target = ball.r + radius;
  if (dist === 0 || dist >= target) {
    return false;
  }

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = target - dist;
  ball.x += nx * overlap;
  ball.y += ny * overlap;

  const relativeVx = ball.vx - object.vx;
  const relativeVy = ball.vy - object.vy;
  const impact = relativeVx * nx + relativeVy * ny;

  const shove = Math.max(-impact * 1.7, 4.2) * bumpPower;
  ball.vx += nx * shove + object.vx * 0.85;
  ball.vy += ny * shove + object.vy * 0.2;

  if (object.facing) {
    ball.vx += object.facing * 1.2 * bumpPower;
  }

  ball.vy -= 0.2 * bumpPower;
  return true;
}

function resolveBodyCollision(player, bumpPower = 1) {
  resolveCircleCollision(player.x, player.y - 50, 34, player, bumpPower * 0.9);
  resolveCircleCollision(player.x, player.y - 95, 28, player, bumpPower * 0.95);
  resolveCircleCollision(player.x, player.y - 62, 24, player, bumpPower * 1.0);
  resolveCircleCollision(player.x, player.y - 28, 22, player, bumpPower * 1.05);
  resolveCircleCollision(player.x, player.y - 2, 18, player, bumpPower * 1.1);
}

function resolvePlayerSeparation() {
  const dx = players.red.x - players.blue.x;
  const minDistance = 54;

  if (Math.abs(dx) >= minDistance) {
    return;
  }

  const overlap = (minDistance - Math.abs(dx)) * 0.5;
  const direction = dx >= 0 ? 1 : -1;

  players.blue.x = clamp(players.blue.x - direction * overlap, 58, WORLD_WIDTH - 58);
  players.red.x = clamp(players.red.x + direction * overlap, 58, WORLD_WIDTH - 58);

  players.blue.vx *= 0.82;
  players.red.vx *= 0.82;
}

function canonicalKeyFromEvent(event) {
  if (event.code === 'Space' || event.key === ' ') {
    return 'space';
  }
  return event.key.toLowerCase();
}

function prettyKey(key) {
  if (key === 'space') return 'Space';
  if (key.startsWith('arrow')) return key.replace('arrow', 'Arrow ');
  if (key.length === 1) return key.toUpperCase();
  return capitalize(key);
}

function isActionPressed(team, action) {
  const keyboardKey = controls[team][action];
  const keyboardPressed = keys.has(keyboardKey);
  const touchPressed = team === 'blue' && touchActions.has(action);
  return keyboardPressed || touchPressed;
}

function processHumanMovement(player, team, dt, enabled) {
  if (!enabled || matchOver || goalPause > 0 || replayActive) {
    player.kickHeld = false;
    player.kickCharge = 0;
    return;
  }

  const left = isActionPressed(team, 'left');
  const right = isActionPressed(team, 'right');
  const jump = isActionPressed(team, 'jump');
  const kick = isActionPressed(team, 'kick');

  let accel = 0;
  if (left) {
    accel -= PLAYER_SPEED;
    player.facing = -1;
  }
  if (right) {
    accel += PLAYER_SPEED;
    player.facing = 1;
  }
  player.vx += accel;

  if (jump && !player.jumpLock && onGround(player)) {
    player.vy = -JUMP_SPEED;
    player.jumpLock = true;
  }
  if (!jump) {
    player.jumpLock = false;
  }

  processKickCharge(player, kick, dt, team);
}

function processKickCharge(player, kickPressed, dt, team) {
  if (kickPressed) {
    if (!player.kickHeld) {
      player.kickHeld = true;
      player.kickCharge = 0;
    } else {
      player.kickCharge = clamp(player.kickCharge + dt * 1.8, 0, 1);
    }
    return;
  }

  if (!player.kickHeld) {
    return;
  }

  if (player.kickCooldown <= 0 && player.stamina > 8) {
    const charge = player.kickCharge;
    const staminaScale = 0.65 + (player.stamina / MAX_STAMINA) * 0.35;
    const power = (1.25 + charge * 0.95) * staminaScale;
    const didHit = attemptKick(player, power);
    const staminaCost = 14 + charge * 28;
    player.stamina = Math.max(0, player.stamina - staminaCost);
    player.kickCooldown = 0.24 + charge * 0.24;

    if (didHit) {
      playSound('kick');
      if (power > 1.75) {
        playSound('kick-heavy');
      }
    }
  }

  player.kickHeld = false;
  player.kickCharge = 0;
}

function attemptKick(player, power = 1) {
  const headX = player.x;
  const headY = player.y - 76;
  const torsoY = player.y - 38;
  const dir = player.facing || 1;
  const kickPointX = headX + dir * 34;
  const kickPointY = player.y - 52;
  let hit = false;

  if (distance(ball.x, ball.y, kickPointX, kickPointY) < KICK_RANGE) {
    ball.vx += (dir * 7.5 + player.vx * 0.45) * power;
    ball.vy -= 3.6 * power;
    hit = true;
  }
  if (distance(ball.x, ball.y, headX + dir * 24, headY) < KICK_RANGE) {
    ball.vx += (dir * 6.2 + player.vx * 0.35) * power;
    ball.vy -= 2.8 * power;
    hit = true;
  }
  if (distance(ball.x, ball.y, headX + dir * 18, torsoY) < KICK_RANGE) {
    ball.vx += (dir * 5.2 + player.vx * 0.3) * power;
    ball.vy -= 1.8 * power;
    hit = true;
  }

  return hit;
}

function updateAi(player, dt) {
  if (gameMode !== 'cpu' || replayActive || matchOver || goalPause > 0) {
    return;
  }

  const profile = AI_PROFILES[difficulty] || AI_PROFILES.normal;

  player.aiDriftTimer -= dt;
  if (player.aiDriftTimer <= 0) {
    player.aiDrift = (Math.random() - 0.5) * 44;
    player.aiDriftTimer = 0.25 + Math.random() * 0.4;
  }

  const goalTarget = ball.x < WORLD_WIDTH / 2 ? 255 : WORLD_WIDTH - 120;
  const chaseTargetX = clamp(ball.x + Math.sign(ball.vx) * profile.interceptWindow + player.aiDrift, 86, WORLD_WIDTH - 86);
  const targetX = ball.x < WORLD_WIDTH * 0.6 ? chaseTargetX : goalTarget;
  const offset = targetX - player.x;

  player.facing = offset < 0 ? -1 : 1;
  player.vx += clamp(offset * 0.045, -profile.maxAccel, profile.maxAccel);

  if (ball.y < player.y - 110 && Math.abs(ball.x - player.x) < 140 && onGround(player)) {
    player.vy = -JUMP_SPEED * profile.jumpBoost;
  }

  if (distance(ball.x, ball.y, player.x, player.y - 55) < profile.kickRange && player.kickCooldown <= 0 && player.stamina > 8) {
    const didHit = attemptKick(player, profile.kickPower);
    player.kickCooldown = profile.kickCooldown;
    player.stamina = Math.max(0, player.stamina - 16);
    if (didHit) {
      playSound('kick');
    }
  }
}

function updatePlayer(player, dt) {
  player.x += player.vx;
  player.y += player.vy;

  player.vy += GRAVITY;
  player.vx *= onGround(player) ? FRICTION : AIR_DRAG;
  player.vx = clamp(player.vx, -MAX_RUN_SPEED, MAX_RUN_SPEED);

  const minX = 58;
  const maxX = WORLD_WIDTH - 58;
  player.x = clamp(player.x, minX, maxX);

  if (player.y >= FLOOR_Y) {
    player.y = FLOOR_Y;
    player.vy = 0;
  }

  if (player.kickCooldown > 0) {
    player.kickCooldown = Math.max(0, player.kickCooldown - dt);
  }

  const regen = player.kickHeld ? 5 : 16;
  player.stamina = clamp(player.stamina + regen * dt, 0, MAX_STAMINA);
}

function collideBallWithRect(x, y, width, height, bounce = 0.75) {
  const closestX = clamp(ball.x, x, x + width);
  const closestY = clamp(ball.y, y, y + height);
  const dx = ball.x - closestX;
  const dy = ball.y - closestY;
  const distSq = dx * dx + dy * dy;

  if (distSq >= ball.r * ball.r) {
    return;
  }

  const dist = Math.sqrt(distSq) || 0.0001;
  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = ball.r - dist;

  ball.x += nx * overlap;
  ball.y += ny * overlap;

  const impact = ball.vx * nx + ball.vy * ny;
  if (impact < 0) {
    ball.vx -= (1 + bounce) * impact * nx;
    ball.vy -= (1 + bounce) * impact * ny;

    const now = performance.now();
    if (impact < -2.4 && now - lastPostSoundTime > 90) {
      playSound('post');
      lastPostSoundTime = now;
    }
  }
}

function resolveGoalFrameCollisions() {
  const barThickness = 8;

  collideBallWithRect(-3, GOAL_TOP, GOAL_DEPTH, barThickness, 0.78);
  collideBallWithRect(-3, GOAL_BOTTOM - barThickness, GOAL_DEPTH, barThickness, 0.72);

  collideBallWithRect(WORLD_WIDTH - GOAL_DEPTH, GOAL_TOP, GOAL_DEPTH + 3, barThickness, 0.78);
  collideBallWithRect(WORLD_WIDTH - GOAL_DEPTH, GOAL_BOTTOM - barThickness, GOAL_DEPTH + 3, barThickness, 0.72);
}

function resolveFloorCollision() {
  if (ball.y + ball.r < FLOOR_Y) {
    return;
  }

  ball.y = FLOOR_Y - ball.r;
  if (ball.vy > 0) {
    ball.vy *= -0.74;
  }
  ball.vx *= 0.985;
}

function updateBall(dt) {
  const subSteps = Math.max(1, Math.ceil(Math.max(Math.abs(ball.vx), Math.abs(ball.vy)) / 7));
  const stepDt = dt / subSteps;

  for (let i = 0; i < subSteps; i += 1) {
    ball.vy += GRAVITY * 0.95 * stepDt * 60;
    ball.x += ball.vx / subSteps;
    ball.y += ball.vy / subSteps;
    ball.vx *= 0.999;

    resolveGoalFrameCollisions();
    resolveFloorCollision();

    if (ball.y - ball.r <= 24) {
      ball.y = 24 + ball.r;
      if (ball.vy < 0) {
        ball.vy *= -0.8;
      }
    }
  }

  const inGoalMouth = ball.y + ball.r > GOAL_TOP && ball.y - ball.r < GOAL_BOTTOM;
  if (!inGoalMouth) {
    if (ball.x - ball.r <= 0) {
      ball.x = ball.r;
      ball.vx *= -0.88;
    }
    if (ball.x + ball.r >= WORLD_WIDTH) {
      ball.x = WORLD_WIDTH - ball.r;
      ball.vx *= -0.88;
    }
  }

  const goalOpenTop = GOAL_TOP + 8;
  const goalOpenBottom = GOAL_BOTTOM - 8;
  const inScoringWindow = ball.y - ball.r > goalOpenTop && ball.y + ball.r < goalOpenBottom;

  const scoredLeft = ball.x < -GOAL_DEPTH && inGoalMouth && inScoringWindow;
  const scoredRight = ball.x > WORLD_WIDTH + GOAL_DEPTH && inGoalMouth && inScoringWindow;

  if (scoredLeft) {
    redScore += 1;
    updateHud();
    startReplay('red');
  } else if (scoredRight) {
    blueScore += 1;
    updateHud();
    startReplay('blue');
  }
}

function drawGoalPosts() {
  const postThickness = 10;
  ctx.fillStyle = '#f5f7fb';
  ctx.fillRect(-3, GOAL_TOP, postThickness, GOAL_BOTTOM - GOAL_TOP);
  ctx.fillRect(WORLD_WIDTH - postThickness + 3, GOAL_TOP, postThickness, GOAL_BOTTOM - GOAL_TOP);
  ctx.fillRect(-3, GOAL_TOP, GOAL_DEPTH, 8);
  ctx.fillRect(WORLD_WIDTH - GOAL_DEPTH, GOAL_TOP, GOAL_DEPTH + 3, 8);
  ctx.fillRect(-3, GOAL_BOTTOM - 8, GOAL_DEPTH, 8);
  ctx.fillRect(WORLD_WIDTH - GOAL_DEPTH, GOAL_BOTTOM - 8, GOAL_DEPTH + 3, 8);
}

function drawField() {
  const gradient = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
  gradient.addColorStop(0, '#2560a4');
  gradient.addColorStop(1, '#143b62');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 14; i += 1) {
    ctx.fillRect(i * 80, 0, 2, WORLD_HEIGHT);
  }

  ctx.fillStyle = '#73c66a';
  ctx.fillRect(0, FLOOR_Y, WORLD_WIDTH, WORLD_HEIGHT - FLOOR_Y);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, FLOOR_Y, WORLD_WIDTH, 6);

  ctx.strokeStyle = 'rgba(255,255,255,0.82)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(WORLD_WIDTH / 2, 16);
  ctx.lineTo(WORLD_WIDTH / 2, FLOOR_Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(WORLD_WIDTH / 2, FLOOR_Y - 18, 60, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(WORLD_WIDTH / 2, FLOOR_Y - 18, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  ctx.fill();

  ctx.strokeRect(0, GOAL_TOP, WORLD_WIDTH, GOAL_BOTTOM - GOAL_TOP);
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, WORLD_WIDTH, FLOOR_Y);
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fillRect(0, GOAL_TOP, GOAL_DEPTH, GOAL_BOTTOM - GOAL_TOP);
  ctx.fillRect(WORLD_WIDTH - GOAL_DEPTH, GOAL_TOP, GOAL_DEPTH, GOAL_BOTTOM - GOAL_TOP);
  drawGoalPosts();
}

function drawPlayer(player) {
  const bodyX = player.x - 18;
  const bodyY = player.y - 60;
  const headY = player.y - 95;
  const shadowX = player.x;
  const shadowY = FLOOR_Y + 8;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.22)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(shadowX, shadowY, 28, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = player.color;
  roundRect(bodyX, bodyY, 36, 62, 14);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(player.x, headY, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#ffe1c3';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(player.x, headY - 5, 26, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();

  ctx.fillStyle = '#1a2230';
  ctx.fillRect(player.x - 4, bodyY + 8, 8, 22);
  ctx.fillRect(player.x - 14, bodyY + 62, 8, 22);
  ctx.fillRect(player.x + 6, bodyY + 62, 8, 22);

  ctx.fillStyle = '#10161f';
  ctx.beginPath();
  ctx.arc(player.x - 9, headY - 2, 3.4, 0, Math.PI * 2);
  ctx.arc(player.x + 9, headY - 2, 3.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1a2230';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x, headY + 5, 9, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}

function drawBallState(ballState) {
  const wobble = Math.sin(performance.now() * 0.01) * 0.8;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#f5f1e8';
  ctx.beginPath();
  ctx.arc(ballState.x, ballState.y, ballState.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = '#1b2330';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballState.x, ballState.y, 6 + wobble, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ballState.x - 10, ballState.y - 2);
  ctx.lineTo(ballState.x + 10, ballState.y + 2);
  ctx.stroke();
}

function drawBanner(text) {
  if (!text) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  roundRect(WORLD_WIDTH / 2 - 190, 32, 380, 48, 18);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 18px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, WORLD_WIDTH / 2, 56);
  ctx.restore();
}

function snapshotFrame() {
  return {
    ball: { x: ball.x, y: ball.y, r: ball.r },
    blue: { x: players.blue.x, y: players.blue.y, color: players.blue.color },
    red: { x: players.red.x, y: players.red.y, color: players.red.color }
  };
}

function pushHistory() {
  frameHistory.push(snapshotFrame());
  if (frameHistory.length > HISTORY_MAX) {
    frameHistory.shift();
  }
}

function startReplay(scorer) {
  replayActive = true;
  replayScorer = scorer;
  replayTimer = REPLAY_SECONDS;
  replayFrames = frameHistory.slice(-190);
  if (!replayFrames.length) {
    replayFrames = [snapshotFrame()];
  }
  replayIndex = 0;
  playSound('goal');
  statusTextEl.textContent = `${capitalize(scorer)} scored. Replay...`;
}

function runReplay(dt) {
  replayTimer -= dt;
  replayIndex += REPLAY_SPEED;

  const idx = Math.min(replayFrames.length - 1, Math.floor(replayIndex));
  const frame = replayFrames[idx];

  drawField();
  drawBallState(frame.ball);
  drawPlayer(frame.blue);
  drawPlayer(frame.red);
  drawBanner('Replay x0.4');

  if (replayTimer <= 0 || idx >= replayFrames.length - 1) {
    replayActive = false;
    frameHistory = [];
    resetRound(replayScorer);
  }
}

function concludeMatch() {
  matchOver = true;
  const isDraw = blueScore === redScore;
  const winner = isDraw ? null : (blueScore > redScore ? 'blue' : 'red');

  if (tournamentMode === 'casual') {
    statusTextEl.textContent = isDraw ? 'Draw - final whistle.' : `${capitalize(winner)} wins - final whistle.`;
    if (winner) {
      playSound('crowd');
    }
    return;
  }

  if (!winner) {
    statusTextEl.textContent = 'Draw match. Rematch loading...';
    pendingNextMatch = true;
    nextMatchTimer = 1.6;
    return;
  }

  if (winner === 'blue') {
    seriesBlue += 1;
  } else {
    seriesRed += 1;
  }

  updateHud();
  const target = getSeriesTarget();
  if (seriesBlue >= target || seriesRed >= target) {
    statusTextEl.textContent = `${capitalize(winner)} wins the series ${seriesBlue}-${seriesRed}.`;
    playSound('crowd');
    return;
  }

  statusTextEl.textContent = `${capitalize(winner)} wins match ${seriesBlue}-${seriesRed}. Next kickoff...`;
  pendingNextMatch = true;
  nextMatchTimer = 2;
}

function step(timestamp) {
  const dt = Math.min(0.033, (timestamp - lastTime) / 1000);
  lastTime = timestamp;

  ctx.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  if (replayActive) {
    runReplay(dt);
    requestAnimationFrame(step);
    return;
  }

  drawField();

  if (!matchOver) {
    if (goalPause > 0) {
      goalPause -= dt;
    } else {
      processHumanMovement(players.blue, 'blue', dt, true);
      processHumanMovement(players.red, 'red', dt, gameMode === 'local');
      updateAi(players.red, dt);
      updatePlayer(players.blue, dt);
      updatePlayer(players.red, dt);
      resolvePlayerSeparation();
      updateBall(dt);

      resolveBodyCollision(players.blue, 1.08);
      resolveBodyCollision(players.red, 1.0);
      resolveBodyCollision(players.blue, 0.8);
      resolveBodyCollision(players.red, 0.75);

      if (!replayActive) {
        if (ball.vx > 0.3) {
          players.blue.facing = 1;
        } else if (ball.vx < -0.3) {
          players.blue.facing = -1;
        }

        pushHistory();
        timeRemaining = Math.max(0, timeRemaining - dt);
        updateHud();
        if (timeRemaining <= 0) {
          concludeMatch();
        }
      }
    }
  } else if (pendingNextMatch) {
    nextMatchTimer -= dt;
    if (nextMatchTimer <= 0) {
      pendingNextMatch = false;
      resetMatch();
    }
  }

  drawBallState(ball);
  drawPlayer(players.blue);
  drawPlayer(players.red);

  if (matchOver) {
    const drawText = blueScore === redScore ? 'Full Time - Draw' : (blueScore > redScore ? 'Blue Wins' : 'Red Wins');
    const seriesText = tournamentMode === 'casual' ? drawText : `${drawText} | Series ${seriesBlue}-${seriesRed}`;
    drawBanner(seriesText);
  } else if (goalPause > 0) {
    drawBanner(statusTextEl.textContent);
  }

  requestAnimationFrame(step);
}

function detectDeviceType() {
  const hasTouch = navigator.maxTouchPoints > 0;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const smallScreen = window.matchMedia('(max-width: 768px)').matches;

  if ((hasTouch && coarse) || smallScreen) return 'phone';
  if (fine && canHover) return 'pc';
  return 'unknown';
}

function applyDeviceClass() {
  const device = detectDeviceType();
  document.body.classList.toggle('device-phone', device === 'phone');
}

function loadControls() {
  try {
    const raw = localStorage.getItem('football-controls');
    if (!raw) return JSON.parse(JSON.stringify(defaultControls));
    const parsed = JSON.parse(raw);
    return {
      blue: {
        left: parsed?.blue?.left || defaultControls.blue.left,
        right: parsed?.blue?.right || defaultControls.blue.right,
        jump: parsed?.blue?.jump || defaultControls.blue.jump,
        kick: parsed?.blue?.kick || defaultControls.blue.kick
      },
      red: {
        left: parsed?.red?.left || defaultControls.red.left,
        right: parsed?.red?.right || defaultControls.red.right,
        jump: parsed?.red?.jump || defaultControls.red.jump,
        kick: parsed?.red?.kick || defaultControls.red.kick
      }
    };
  } catch {
    return JSON.parse(JSON.stringify(defaultControls));
  }
}

function saveControls() {
  localStorage.setItem('football-controls', JSON.stringify(controls));
}

function refreshBindButtons() {
  bindButtons.forEach((btn) => {
    const team = btn.dataset.team;
    const action = btn.dataset.action;
    btn.textContent = `${capitalize(action)}: ${prettyKey(controls[team][action])}`;
    btn.classList.remove('is-waiting');
  });
}

function openKeybindPanel() {
  keybindPanel.classList.remove('is-hidden');
}

function closeKeybindPanel() {
  keybindPanel.classList.add('is-hidden');
  awaitingBind = null;
  bindHint.textContent = 'Tip: click a button then press a key to remap.';
  refreshBindButtons();
}

function attachTouchControls() {
  touchButtons.forEach((btn) => {
    const action = btn.dataset.touchAction;

    const press = (event) => {
      event.preventDefault();
      touchActions.add(action);
      ensureAudioContext();
    };

    const release = (event) => {
      event.preventDefault();
      touchActions.delete(action);
    };

    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
    btn.addEventListener('pointercancel', release);
  });
}

function ensureAudioContext() {
  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return;
  }

  const ContextCtor = window.AudioContext || window.webkitAudioContext;
  if (ContextCtor) {
    audioCtx = new ContextCtor();
  }
}

function playBeep(freq, duration, type = 'sine', gain = 0.05) {
  if (muted || !audioCtx) {
    return;
  }

  const oscillator = audioCtx.createOscillator();
  const amp = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = freq;
  amp.gain.value = gain;
  oscillator.connect(amp);
  amp.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  amp.gain.setValueAtTime(gain, now);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playSound(kind) {
  ensureAudioContext();
  if (!audioCtx || muted) {
    return;
  }

  if (kind === 'kick') {
    playBeep(220, 0.08, 'triangle', 0.05);
  } else if (kind === 'kick-heavy') {
    playBeep(140, 0.12, 'square', 0.06);
  } else if (kind === 'post') {
    playBeep(760, 0.06, 'sine', 0.04);
  } else if (kind === 'goal') {
    playBeep(420, 0.1, 'triangle', 0.06);
    setTimeout(() => playBeep(580, 0.1, 'triangle', 0.05), 90);
  } else if (kind === 'crowd') {
    playBeep(260, 0.16, 'sawtooth', 0.05);
    setTimeout(() => playBeep(330, 0.16, 'sawtooth', 0.05), 100);
    setTimeout(() => playBeep(390, 0.2, 'sawtooth', 0.05), 210);
  }
}

function toggleMute() {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound: Off' : 'Sound: On';
}

function capitalize(value) {
  return value[0].toUpperCase() + value.slice(1);
}

window.addEventListener('keydown', (event) => {
  ensureAudioContext();

  const key = canonicalKeyFromEvent(event);

  if (awaitingBind) {
    event.preventDefault();
    controls[awaitingBind.team][awaitingBind.action] = key;
    saveControls();
    refreshBindButtons();
    bindHint.textContent = `Bound ${awaitingBind.team} ${awaitingBind.action} to ${prettyKey(key)}.`;
    awaitingBind = null;
    return;
  }

  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'space', 'enter'].includes(key) || key.length === 1) {
    event.preventDefault();
  }

  keys.add(key);
});

window.addEventListener('keyup', (event) => {
  const key = canonicalKeyFromEvent(event);
  keys.delete(key);
});

window.addEventListener('blur', () => {
  keys.clear();
  touchActions.clear();
});

modeCpuBtn.addEventListener('click', () => setGameMode('cpu'));
modeLocalBtn.addEventListener('click', () => setGameMode('local'));
difficultyEasyBtn.addEventListener('click', () => setDifficulty('easy'));
difficultyNormalBtn.addEventListener('click', () => setDifficulty('normal'));
difficultyHardBtn.addEventListener('click', () => setDifficulty('hard'));
tourCasualBtn.addEventListener('click', () => setTournamentMode('casual'));
tourBo3Btn.addEventListener('click', () => setTournamentMode('bo3'));
tourBo5Btn.addEventListener('click', () => setTournamentMode('bo5'));
restartBtn.addEventListener('click', resetCompetition);
muteBtn.addEventListener('click', toggleMute);
keybindsBtn.addEventListener('click', openKeybindPanel);
closeKeybindsBtn.addEventListener('click', closeKeybindPanel);

bindButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    refreshBindButtons();
    btn.classList.add('is-waiting');
    awaitingBind = { team: btn.dataset.team, action: btn.dataset.action };
    bindHint.textContent = `Press a key for ${btn.dataset.team} ${btn.dataset.action}...`;
  });
});

attachTouchControls();
applyDeviceClass();
window.addEventListener('resize', applyDeviceClass);
refreshBindButtons();
setDifficulty('normal');
setTournamentMode('casual');
setGameMode('cpu');
requestAnimationFrame(step);