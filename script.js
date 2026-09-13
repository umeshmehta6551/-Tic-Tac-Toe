/**
 * Tic-Tac-Toe — Vanilla JavaScript
 * 2-player local game: X always starts.
 */

// ─── DOM references ──────────────────────────────────────────────────────────
const statusEl     = document.getElementById('status');
const boardEl      = document.getElementById('board');
const cells        = Array.from(document.querySelectorAll('.cell'));
const newGameBtn   = document.getElementById('new-game-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const scoreXEl     = document.getElementById('score-x');
const scoreOEl     = document.getElementById('score-o');
const scoreDrawsEl = document.getElementById('score-draws');

// ─── All 8 winning combinations (cell indices) ───────────────────────────────
const WIN_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6], // anti diagonal
];

// ─── Game state ───────────────────────────────────────────────────────────────
const state = {
  board: Array(9).fill(''),   // '' | 'X' | 'O'
  currentPlayer: 'X',
  gameActive: false,
  scores: { X: 0, O: 0, draws: 0 },
};

// ─── Initialise ───────────────────────────────────────────────────────────────
startGame();

// ─── Event listeners ─────────────────────────────────────────────────────────
boardEl.addEventListener('click', handleCellClick);
newGameBtn.addEventListener('click', startGame);
resetScoreBtn.addEventListener('click', resetScore);

// ─── Core functions ───────────────────────────────────────────────────────────

/** Reset the board and start a fresh round (scores are preserved). */
function startGame() {
  state.board        = Array(9).fill('');
  state.currentPlayer = 'X';
  state.gameActive   = true;

  cells.forEach((cell) => {
    cell.textContent  = '';
    cell.className    = 'cell';           // strip x / o / winner classes
    cell.disabled     = false;
    cell.setAttribute('data-value', '');
    cell.setAttribute('aria-label', `Cell ${Number(cell.dataset.index) + 1}, empty`);
  });

  updateStatus();
}

/**
 * Handle a click anywhere on the board.
 * Uses event delegation — checks that the click target is a .cell.
 */
function handleCellClick(event) {
  const cell = event.target.closest('.cell');
  if (!cell || !state.gameActive) return;

  const index = Number(cell.dataset.index);

  // Ignore already-occupied cells
  if (state.board[index] !== '') return;

  placeMarker(cell, index);

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }

  if (checkDraw()) {
    endGame(null);
    return;
  }

  switchPlayer();
  updateStatus();
}

/** Write the current player's mark into the board state and DOM. */
function placeMarker(cell, index) {
  const player          = state.currentPlayer;
  state.board[index]    = player;
  cell.textContent      = player;
  cell.classList.add(player.toLowerCase());
  cell.setAttribute('data-value', player);
  cell.setAttribute('aria-label', `Cell ${index + 1}, ${player}`);
}

/**
 * Check all 8 win combinations against the current board state.
 * Returns the winning combo array, or null if no winner yet.
 */
function checkWinner() {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (
      state.board[a] !== '' &&
      state.board[a] === state.board[b] &&
      state.board[a] === state.board[c]
    ) {
      return combo;
    }
  }
  return null;
}

/** Returns true when all 9 cells are filled (and no winner exists). */
function checkDraw() {
  return state.board.every((cell) => cell !== '');
}

/** Flip the current player between X and O. */
function switchPlayer() {
  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
}

/**
 * End the game.
 * @param {number[]|null} winCombo — winning indices, or null for a draw.
 */
function endGame(winCombo) {
  state.gameActive = false;

  // Disable every cell to prevent further clicks
  cells.forEach((cell) => {
    cell.disabled = true;
  });

  if (winCombo) {
    const winner = state.currentPlayer;

    // Highlight the three winning cells
    winCombo.forEach((i) => {
      cells[i].classList.add('winner');
    });

    // Update score
    state.scores[winner]++;
    updateScoreboard(winner === 'X' ? scoreXEl : scoreOEl);
    updateStatus(`Player ${winner} Wins!`, winner === 'X' ? 'x-wins' : 'o-wins');
  } else {
    // Draw
    state.scores.draws++;
    updateScoreboard(scoreDrawsEl);
    updateStatus("It's a Draw!", 'draw');
  }
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

/** Update the status bar text and styling. */
function updateStatus(message, cssClass) {
  // Default — show whose turn it is
  if (!message) {
    const p = state.currentPlayer;
    message  = `Player ${p}'s Turn`;
    cssClass = p === 'X' ? 'x-turn' : 'o-turn';
  }

  statusEl.textContent = message;
  // Remove all variant classes then apply the new one
  statusEl.className = `status ${cssClass ?? ''}`.trim();

  // Trigger re-animation by forcing a reflow
  statusEl.classList.remove('animate');
  void statusEl.offsetWidth; // reflow
  statusEl.classList.add('animate');
}

/** Re-render the three score counters. */
function updateScoreboard(bumpEl) {
  scoreXEl.textContent     = state.scores.X;
  scoreOEl.textContent     = state.scores.O;
  scoreDrawsEl.textContent = state.scores.draws;

  if (bumpEl) {
    bumpEl.classList.remove('bump');
    void bumpEl.offsetWidth; // reflow
    bumpEl.classList.add('bump');
  }
}

/**
 * Reset all scores to zero and start a new game.
 * Called by the "Reset Score" button.
 */
function resetScore() {
  state.scores = { X: 0, O: 0, draws: 0 };
  updateScoreboard();
  startGame();
}
