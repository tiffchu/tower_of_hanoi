// Tower of Hanoi Game Logic

// Initialize game state
let currentLevel = 3;
let moveCounter = 0;
let selectedDisk = null;

function createDisks(numDisks) {
    const peg1 = document.getElementById('peg1');
    peg1.innerHTML = '';
    for (let i = numDisks; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.setAttribute('data-size', i);
        disk.draggable = true; 
        disk.id = `disk-${i}`; //  an id for drag and drop
        peg1.appendChild(disk);
    }
}

function updateLevel(change) {
    currentLevel += change;
    if (currentLevel < 3) currentLevel = 3;
    if (currentLevel > 8) currentLevel = 8;
    document.getElementById('current-level').textContent = currentLevel;
    updateMinMoves();
    resetGame();
}

function updateMinMoves() {
    const minMoves = Math.pow(2, currentLevel) - 1;
    document.getElementById('min-moves').textContent = minMoves;
}

function resetGame() {
    moveCounter = 0;
    document.getElementById('move-counter').textContent = moveCounter;
    
    // clear pegs
    document.querySelectorAll('.peg').forEach(peg => {
        peg.innerHTML = '';
    });
    
    createDisks(currentLevel);
    initializeDragAndDrop();
    updateMinMoves();
}

function initializeDragAndDrop() {
    const disks = document.querySelectorAll('.disk');
    const pegs = document.querySelectorAll('.peg');

    disks.forEach(disk => {
        disk.addEventListener('mousedown', selectDisk);
        disk.addEventListener('dragstart', dragStart);
        disk.addEventListener('dragend', dragEnd);
    });

    pegs.forEach(peg => {
        peg.addEventListener('click', placeDisk);
        peg.addEventListener('dragover', dragOver);
        peg.addEventListener('drop', drop);
    });
}

function selectDisk(e) {
    if (!selectedDisk && e.target.parentElement.lastElementChild === e.target) {
        selectedDisk = e.target;
        selectedDisk.style.opacity = '0.5';
    }
}

function placeDisk(e) {
    if (selectedDisk) {
        const targetPeg = e.currentTarget;
        moveDisk(targetPeg);
    }
}

function dragStart(e) {
    if (e.target.parentElement.lastElementChild === e.target) {
        selectedDisk = e.target;
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    } else {
        e.preventDefault();
    }
}

function dragEnd(e) {
    e.target.style.display = 'block';
    selectedDisk = null;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const targetPeg = e.target.closest('.peg');
    moveDisk(targetPeg);
}

function moveDisk(targetPeg) {
    const topDisk = targetPeg.lastElementChild;

    if (!topDisk || parseInt(selectedDisk.getAttribute('data-size')) < parseInt(topDisk.getAttribute('data-size'))) {
        targetPeg.appendChild(selectedDisk);
        selectedDisk.style.opacity = '1';
        selectedDisk.style.display = 'block';
        selectedDisk = null;
        moveCounter++;
        document.getElementById('move-counter').textContent = moveCounter;
        checkWinCondition();
    } else {
        selectedDisk.style.opacity = '1';
        selectedDisk.style.display = 'block';
        selectedDisk = null;
    }
}

function checkWinCondition() {
    const lastPeg = document.getElementById('peg3');
    if (lastPeg.children.length === currentLevel) {
        alert(`Congratulations! You solved the puzzle in ${moveCounter} moves!`);
    }
}

document.getElementById('decrease-level').addEventListener('click', () => updateLevel(-1));
document.getElementById('increase-level').addEventListener('click', () => updateLevel(1));
document.getElementById('reset-btn').addEventListener('click', resetGame);

// Initialize the game
resetGame();
initializeDragAndDrop();
updateMinMoves();