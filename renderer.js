const quotes = [
  "you're doing better than you think 🌸",
  "one minute at a time, you've got this 💛",
  "you're enough, exactly as you are 🌿",
  "proud of you for showing up today 🤍",
  "you're gonna make it, i promise 🌙",
  "small steps still move you forward ✨",
  "you are so much stronger than you know 🌷",
  "it's okay to rest, then rise again 🌸",
  "you're loved more than you realise 💜",
  "keep going, the best is still coming 🌻"
]

let totalSeconds = 25 * 60
let remainingSeconds = totalSeconds
let timerInterval = null
let isRunning = false

const display = document.getElementById('timer-display')
const quoteEl = document.getElementById('quote')
const alarm = document.getElementById('alarm')
const minutesInput = document.getElementById('custom-minutes')

const songs = [
  'assets/Coffee.mp3',
  'assets/Fade Into You.mp3',
  "assets/I Don't Wanna Be Okay Without You.mp3",
  "assets/j's lullaby (darlin' i'd wait for you).mp3",
  'assets/My Kind of Woman.mp3',
  'assets/Sweedeedee.mp3',
  'assets/Terrapin.mp3',
  'assets/Toothpaste Kisses.mp3',
  "assets/We'll Never Have Sex.mp3",
  'assets/You Are My One Desire.mp3',
]

// ── PATTERNS ──
const patterns = {
  none: '',
  gingham: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='rgba(255,255,255,0.4)'/%3E%3Crect x='10' y='10' width='10' height='10' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E")`,
  dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2.5' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E")`,
  stripes: `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='10' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E")`,
  grid: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0H0v20' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='1'/%3E%3C/svg%3E")`,
  hearts: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext y='18' font-size='14' opacity='0.3'%3E%E2%99%A5%3C/text%3E%3C/svg%3E")`,
}

let currentPattern = 'none'

function applyPattern(name) {
  currentPattern = name
  const app = document.querySelector('.app')
  if (name === 'none') {
    app.style.backgroundImage = ''
  } else {
    app.style.backgroundImage = patterns[name]
    app.style.backgroundSize = name === 'gingham' ? '20px 20px' : 'auto'
  }
  document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'))
  document.querySelector(`[data-pattern="${name}"]`)?.classList.add('active')
}

// ── SONGS ──
function playRandomSong() {
  const path = songs[Math.floor(Math.random() * songs.length)]
  alarm.pause()
  alarm.src = path
  alarm.load()
  alarm.play().catch(() => {
    alarm.addEventListener('canplaythrough', () => {
      alarm.play()
    }, { once: true })
  })
  document.getElementById('btn-song').textContent = '⏸ song'
}

// ── TIMER ──
function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function updateDisplay() {
  display.textContent = formatTime(remainingSeconds)
}

function showRandomQuote() {
  quoteEl.style.opacity = 0
  setTimeout(() => {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)]
    quoteEl.style.opacity = 1
  }, 300)
}

function startTimer() {
  if (isRunning) return
  isRunning = true
  timerInterval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval)
      isRunning = false
      playRandomSong()
      showRandomQuote()
      return
    }
    remainingSeconds--
    updateDisplay()
    if (remainingSeconds % 60 === 0) showRandomQuote()
  }, 1000)
}

function pauseTimer() {
  clearInterval(timerInterval)
  isRunning = false
}

function restartTimer() {
  clearInterval(timerInterval)
  isRunning = false
  remainingSeconds = totalSeconds
  updateDisplay()
  alarm.pause()
  startTimer()
}

function stopTimer() {
  clearInterval(timerInterval)
  isRunning = false
  remainingSeconds = totalSeconds
  updateDisplay()
  alarm.pause()
  document.getElementById('btn-song').textContent = '▶ song'
  showRandomQuote()
}

function applyCustomTime() {
  const mins = parseInt(minutesInput.value)
  if (!mins || mins < 1) return
  totalSeconds = mins * 60
  remainingSeconds = totalSeconds
  updateDisplay()
  if (isRunning) {
    clearInterval(timerInterval)
    isRunning = false
    startTimer()
  }
}

document.getElementById('btn-start').addEventListener('click', startTimer)
document.getElementById('btn-pause').addEventListener('click', pauseTimer)
document.getElementById('btn-restart').addEventListener('click', restartTimer)
document.getElementById('btn-stop').addEventListener('click', stopTimer)
document.getElementById('btn-apply').addEventListener('click', applyCustomTime)

document.getElementById('btn-song').addEventListener('click', () => {
  if (alarm.paused) {
    alarm.play()
    document.getElementById('btn-song').textContent = '⏸ song'
  } else {
    alarm.pause()
    document.getElementById('btn-song').textContent = '▶ song'
  }
})

// ── THEME ──
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    if (btn.dataset.theme === 'lavender') {
      document.body.removeAttribute('data-theme')
    } else {
      document.body.setAttribute('data-theme', btn.dataset.theme)
    }
    applyPattern(currentPattern)
  })
})

// ── TABS ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'))
    document.getElementById(`${tab.dataset.tab}-screen`).classList.remove('hidden')
  })
})

// ── PATTERN BUTTONS ──
document.querySelectorAll('.pattern-btn').forEach(btn => {
  btn.addEventListener('click', () => applyPattern(btn.dataset.pattern))
})

// ── JUMP GAME ──
const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

let gameRunning = false
let gameLoop = null
let score = 0
let player, obstacles, speed

function initGame() {
  player = { x: 80, y: 150, w: 30, h: 30, vy: 0, onGround: true }
  obstacles = []
  speed = 4
  score = 0
  document.getElementById('score').textContent = 0
}

function jump() {
  if (player.onGround) {
    player.vy = -12
    player.onGround = false
  }
}

function spawnObstacle() {
  const h = 20 + Math.random() * 30
  obstacles.push({ x: 700, y: 180 - h, w: 20, h: h })
}

function drawGame() {
  ctx.clearRect(0, 0, 700, 200)
  ctx.fillStyle = '#e9d5ff'
  ctx.fillRect(0, 180, 700, 20)
  ctx.fillStyle = '#c084fc'
  ctx.beginPath()
  ctx.roundRect(player.x, player.y, player.w, player.h, 8)
  ctx.fill()
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(player.x + 20, player.y + 10, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#4a3f5c'
  ctx.beginPath()
  ctx.arc(player.x + 21, player.y + 10, 2.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#f9a8d4'
  obstacles.forEach(obs => {
    ctx.beginPath()
    ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4)
    ctx.fill()
  })
  ctx.fillStyle = '#9d8aad'
  ctx.font = '14px Georgia'
  ctx.fillText(`score: ${Math.floor(score / 10)}`, 10, 20)
}

function updateGame() {
  player.vy += 0.7
  player.y += player.vy
  if (player.y >= 150) {
    player.y = 150
    player.vy = 0
    player.onGround = true
  }
  if (Math.random() < 0.015) spawnObstacle()
  obstacles.forEach(obs => obs.x -= speed)
  obstacles = obstacles.filter(obs => obs.x + obs.w > 0)
  obstacles.forEach(obs => {
    if (
      player.x < obs.x + obs.w &&
      player.x + player.w > obs.x &&
      player.y < obs.y + obs.h &&
      player.y + player.h > obs.y
    ) { endGame() }
  })
  score++
  document.getElementById('score').textContent = Math.floor(score / 10)
  speed = 4 + Math.floor(score / 300) * 0.5
  drawGame()
}

function startGame() {
  if (gameRunning) return
  initGame()
  gameRunning = true
  gameLoop = setInterval(updateGame, 1000 / 60)
}

function endGame() {
  clearInterval(gameLoop)
  gameRunning = false
  ctx.fillStyle = 'rgba(192,132,252,0.4)'
  ctx.fillRect(0, 0, 700, 200)
  ctx.fillStyle = '#4a3f5c'
  ctx.font = 'bold 28px Georgia'
  ctx.textAlign = 'center'
  ctx.fillText('aww, you hit one! 🌸', 350, 90)
  ctx.font = '18px Georgia'
  ctx.fillText(`score: ${Math.floor(score / 10)}`, 350, 125)
  ctx.textAlign = 'left'
}

function resetGame() {
  clearInterval(gameLoop)
  gameRunning = false
  initGame()
  drawGame()
}

document.getElementById('btn-game-start').addEventListener('click', startGame)
document.getElementById('btn-game-reset').addEventListener('click', resetGame)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); jump() }
})
canvas.addEventListener('click', jump)

// init
initGame()
drawGame()
showRandomQuote()
updateDisplay()