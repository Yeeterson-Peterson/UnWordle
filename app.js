const board = document.getElementById("board");
const guessEl = document.getElementById("guess");
const submitBtn = document.getElementById("submit");
const newBtn = document.getElementById("newBtn");
const msgEl = document.getElementById("msg");

const WORD_LEN = 5;
const MAX_ATTEMPTS = 6;
let currentRow = 0;

function setMsg(t) {
    msgEl.textContent = t || "";
}

function buildBoard() {
    board.innerHTML = "";
    for (let x = 0; x < MAX_ATTEMPTS; x++){
        const row = document.createElement("div");
        row.className = "row";
        for (let y = 0; y < WORD_LEN; y++){
            const tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

function createGuess(guess) {
    const rows = board.querySelectorAll(".rows");
    const tiles = rows[currentRow].querySelectorAll(".tile")
    for (let i = 0; i < WORD_LEN; i++) { tiles[i].textContent = guess[i]
    }
    currentRow += 1;
}

function onSubmit() {
    const x = (guessEl.value || "").trim().toLowerCase();
    if (x.length !==5 || !/^[a-z]+$/.test(x)) {
        setMsg("Please have all words exactly 5 letters");
        return;
    }
    if (currentRow >= MAX_ATTEMPTS) {
        setMsg("No more tries. Try a new attempt!");
        return
    }
    setMsg("");
    createGuess(x);
    guessEl.value = "";
    guessEl.focus();

    }
    function newGame() {
        currentRow = 0;
        buildBoard();
        setMsg("Go for it!!");
        guessEl.value = "";
        guessEl.focus();
    }

    submitBtn.addEventListener("click", onSubmit);
    newBtn.addEventListener("click", newGame);
    guessEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") onSubmit();
    });

    newGame();
