const board = document.getElementById("board");
const guessEl = document.getElementById("guess");
const submitBtn = document.getElementById("submit");
const newBtn = document.getElementById("newBtn");
const msgEl = document.getElementById("msg");

const WORD_LEN = 5;
const MAX_ATTEMPTS = 6;
let currentRow = 0;
let secretWord = "";
let wordList = [];

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
   const row = rows[currentRow];
   if (!row) return;

   const tiles = row.querySelectorAll(".tile");

   tiles.forEach(t => t.classList.remove("correct", "present", "absent" ));

   const secretArr = secretWord.split("");
   const used = Array(WORD_LEN).fill(false);

   for (let i = 0; i < WORD_LEN; i++) {
    tiles[i].textContent = guess[i].toUpperCase();
    if (guess[i] === secretArr[i]) {
        tiles[i].classList.add("correct");
        used[i] = true;
    }

    if (x===secretWord) {
        setMsg("Good job you won");
        guessEl.disabled = true;
        return;

    }
    if (currentRow >= MAX_ATTEMPTS) {
        setMsg("You lost");
        guessEl.disabled = true;
        return;
    }
   }

for (let i = 0; i < WORD_LEN; i++) {
    if (tiles[i].classList.contains("correct")) continue;

    let found = false;
    for (let x = 0; x < WORD_LEN; x++) {
        if (!used[x] && guess[i] === secretArr[x]) {
            found = true;
            used[x] = true;
            break;
        }
    }

    tiles[i].classList.add(found ? "present" : "absent");

}

currentRow += 1;
}



function previewGuess(text) {
    const rows = board.querySelectorAll(".row");
    if (!rows[currentRow]) return;

    const tiles = rows[currentRow].querySelectorAll(".tile");

}

function onSubmit() {
    console.log("submit clicked");
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

    if (x === secretWord) {
        setMsg("You won!");
        guessEl.disabled = true;
        return;
    }

    }

async function loadWords() {
    const res = await fetch("./allowed.txt");
    const text = await res.text();
    wordList = text
    .split("\n")
    .map(w => w.trim().toLowerCase())
   .filter(w => w.length === WORD_LEN); 
   secretWord = wordList[Math.floor(Math.random() * wordList.length)]
   console.log("Secret word:", secretWord);
}
    function newGame() {
        currentRow = 0;
        buildBoard();
        setMsg("Go for it!!");
        guessEl.value = "";
        guessEl.focus();
        guessEl.disabled = false;

        secretWord = wordList[Math.floor(Math.random() * wordList.length())]
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