# 🍅 Sammy's Pomodoro App

A pastel-themed Pomodoro timer desktop app built with Electron — designed to make studying feel a little softer, a little cuter, and a lot more motivating.

## 💭 The Idea

I built this during my summer break between first and second year of B.Tech ECE at JIIT Noida. I wanted a productivity tool that didn't feel cold or clinical — something that actually made me *want* to sit down and study. Most pomodoro apps are minimal and boring, so I thought: what if it had pastel themes, encouraging little quotes, a song that plays when you're done, and a tiny game for your 5-minute break? That's exactly what this is.

## ✨ Features

- **Custom timer** — set it to any duration you want, not just 25 minutes
- **Full timer controls** — start, pause, restart, and stop anytime, even mid-session
- **Random song player** — plays a random song from your playlist when the timer ends, with pause/play control
- **Encouraging quotes** — soft, rotating motivational quotes to keep you going (*"you're enough, exactly as you are 🌿"*)
- **5 pastel themes** — lavender, pink, green, yellow, and blue
- **6 background patterns** — none, gingham, dots, stripes, grid, and hearts
- **Break game** — a tiny jump-over-obstacles game built into the app for your break time
- **Draggable window** — no title bar, drag it anywhere on your screen
- **Resizable** — make it as big or small as you want
- **Pixeboy font** — because aesthetic matters
## 📸 Screenshots

### Timer — Lavender Gingham
![Timer Lavender](screenshots/Screenshot_2026-06-17_at_12_24_10_PM.png)

### Timer — Yellow Hearts
![Timer Yellow](screenshots/Screenshot_2026-06-17_at_12_24_30_PM.png)

### Break Game
![Break Game](screenshots/Screenshot_2026-06-17_at_12_25_28_PM.png)

---

## 🛠 Built With

- [Electron](https://www.electronjs.org/) — desktop app framework
- HTML, CSS, JavaScript — frontend
- Canvas API — for the break game
- [Pixeboy Font](https://www.dafont.com/pixeboy.font) — the pixel font used throughout

---

## 🚀 Run Locally

bash
# clone the repo
git clone https://github.com/samriddhisharma1701/pomodoro-app.git
cd pomodoro-app


# install dependencies
npm install

# add your own mp3 files to the assets/ folder
# update the songs array in renderer.js with your filenames

# run the app
npx electron .

## 📁 Project Structure
pomodoro-app/

├── main.js          # Electron main process

├── index.html       # App UI

├── style.css        # All the pastel styling

├── renderer.js      # Timer logic, game, quotes, themes

├── assets/          # Font file + your mp3 songs

└── screenshots/     # App screenshots

##👩‍💻 About

Built by **Samriddhi Sharma** — ECE undergrad at JIIT Noida, batch 2025–2029.
