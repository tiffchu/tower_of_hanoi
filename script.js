// Tower of Hanoi Game Logic

// Initialize game state
let moves = 0;
const pegs = [
    document.getElementById('peg1'),
    document.getElementById('peg2'),
    document.getElementById('peg3')
];
const resetButton = document.getElementById('reset-btn');
const moveCounter = document.getElementById('move-counter');

let selectedDisk = null;

// Function to check if a move is valid
function isValidMove(fromPeg, toPeg) {
    if (fromPeg.children.length === 0) return false;
    if (toPeg.children.length === 0) return true;
    return parseInt(fromPeg.lastElementChild.dataset.size) < parseInt(toPeg.lastElementChild.dataset.size);
}

// Function to move a disk
function moveDisk(fromPeg, toPeg) {
    const disk = fromPeg.lastElementChild;
    toPeg.appendChild(disk);
    moves++;
    moveCounter.textContent = moves;
    checkWin();
}

// Function to check if the game is won
function checkWin() {
    if (pegs[2].children.length === 4) {
        setTimeout(() => {
            alert(`Congratulations! You solved the puzzle in ${moves} moves!`);
        }, 100);
    }
}

// Event listener for disk selection and movement
pegs.forEach(peg => {
    peg.addEventListener('click', () => {
        if (!selectedDisk) {
            if (peg.children.length > 0) {
                selectedDisk = peg;
                peg.lastElementChild.style.opacity = '0.5';
            }
        } else {
            if (isValidMove(selectedDisk, peg)) {
                moveDisk(selectedDisk, peg);
            }
            selectedDisk.lastElementChild.style.opacity = '1';
            selectedDisk = null;
        }
    });
});

// Function to reset the game
function resetGame() {
    moves = 0;
    moveCounter.textContent = moves;
    pegs[1].innerHTML = '';
    pegs[2].innerHTML = '';
    pegs[0].innerHTML = `
        <div class="disk" data-size="4"></div>
        <div class="disk" data-size="3"></div>
        <div class="disk" data-size="2"></div>
        <div class="disk" data-size="1"></div>
    `;
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();
