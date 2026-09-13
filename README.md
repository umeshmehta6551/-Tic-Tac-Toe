# Tic-Tac-Toe 🎮

A complete, responsive, and polished **2-player Tic-Tac-Toe game** built with pure HTML, CSS, and Vanilla JavaScript — no frameworks, no libraries, no dependencies.

![Game Preview](https://img.shields.io/badge/Game-Tic--Tac--Toe-blueviolet?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🕹️ How to Play

1. Open `index.html` in any modern browser — no install, no server needed.
2. **Player X** always goes first.
3. Players take turns clicking an empty cell to place their mark.
4. The first player to get **3 in a row** (horizontally, vertically, or diagonally) wins.
5. If all 9 cells are filled with no winner, the game is a **Draw**.
6. Click **New Game** to play another round (scores are kept).
7. Click **Reset Score** to clear the scoreboard and start fresh.

---

## ✨ Features

- **2-player local gameplay** — Player X vs Player O on the same device
- **Win detection** — all 8 winning combinations checked automatically
- **Draw detection** — triggers when all cells are filled with no winner
- **Winning cell highlight** — the three winning cells pulse with a gold glow
- **Live scoreboard** — tracks X wins, O wins, and draws across rounds
- **New Game** — resets the board without clearing the score
- **Reset Score** — clears scores and starts a new game
- **Smooth animations** — mark pop-in, status bounce, score bump
- **Fully responsive** — works on desktop, tablet, and mobile
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, visible focus states

---

## 📁 File Structure

```
Tic-Tac-Toe/
├── index.html   # Page structure, board, scoreboard, buttons
├── style.css    # All visual styling, animations, responsive design
└── script.js    # Complete game logic, state management, event handling
```

---

## 🏆 Win Combinations

The game checks all **8 possible winning lines**:

| Combination     | Cells        |
|-----------------|--------------|
| Top row         | 0 · 1 · 2    |
| Middle row      | 3 · 4 · 5    |
| Bottom row      | 6 · 7 · 8    |
| Left column     | 0 · 3 · 6    |
| Middle column   | 1 · 4 · 7    |
| Right column    | 2 · 5 · 8    |
| Main diagonal   | 0 · 4 · 8    |
| Anti diagonal   | 2 · 4 · 6    |

---

## 🎨 Customisation

All design tokens live as CSS custom properties at the top of `style.css`:

```css
:root {
  --x-color: #ff6b6b;       /* X mark colour */
  --o-color: #4ecdc4;       /* O mark colour */
  --win-border: #ffd700;    /* Winning cell highlight colour */
  --board-size: min(90vw, 420px);  /* Board size */
  --cell-radius: 16px;      /* Cell corner roundness */
}
```

Change these values to restyle the game instantly without touching the rest of the CSS.

---

## 🚀 Running the Game

Just open the file in a browser:

```bash
# Option 1 — double-click the file in File Explorer

# Option 2 — open from terminal
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

No build step, no npm, no server required.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
