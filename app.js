const board = document.getElementById("board");
const guessEl = document.getElementById("guess");
const submitBtn = document.getElementById("submit");
const newBtn = document.getElementById("newBtn");
const msgEl = document.getElementById("msg");

const WORD_LEN = 5;
const MAX_ATTEMPTS = 6;
let currentRow = 0;
let secretWord = "leave";

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
    const rows = board.querySelectorAll(".row");
    const tiles = rows[currentRow].querySelectorAll(".tile");

    const secretArr = secretWord.split("");
    const used = Array(WORD_LEN).fill(false);

    for (let i = 0; i < WORD_LEN; i++ ) {
        tiles[i].textContent = guess[i].toUpperCase();

        if (guess[i] === secretArr[i]) {
            tiles[i].classList.add("correct");
            used[i] = true;
        }
        }
for (let i = 0; i < WORD_LEN; i++) {
    if (tiles[i].classList.contains("correct")) continue;

    let found = false;
    for (let k = 0; k < WORD_LEN; k++) {
        if (!used[k] && guess[i] === secretArr[k]) {
            found = true;
            used[j] = true;
            break;
        }
    }
}

if (found) {
    tiles[i].classList.add("present");
} else {
    tiles[i].classList.add("absent");
}

}

function previewGuest(text) {
    const rows = board.querySelectorAll(".row");
    if (!rows[currentRow]) return;

    const tiles = rows[currentRow].querySelectorAll(".tile");
    
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
    previewGuess("");
    guessEl.value = "";
    guessEl.focus();

    if (x=== secretWord) {
        setMsg("You won!");
        guessEl.disabled = true;
        return;
    }

    }
    function newGame() {
        currentRow = 0;
        buildBoard();
        setMsg("Go for it!!");
        guessEl.value = "";
        guessEl.focus();
        guessEl.disabled = false;
    }

    submitBtn.addEventListener("click", onSubmit);
    newBtn.addEventListener("click", newGame);
    guessEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") onSubmit();
    });

    guessEl.addEventListener("input", () => {
        const val = guessEl.value
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .slice(0, WORD_LEN)

        guessEl.value = val;
        previewGuess(val);
    });

    newGame();