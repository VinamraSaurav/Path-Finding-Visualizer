const GRID_SIZE = 15;
let grid = [];
let startCell = null;
let endCell = null;
let mode = 'start'; 
let isVisualizing = false;

function initGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, var(--cell-size))`;

    for (let row = 0; row < GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => handleCellClick(row, col));
            gridElement.appendChild(cell);
            grid[row][col] = {
                element: cell,
                row,
                col,
                isWall: false,
                isStart: false,
                isEnd: false
            };
        }
    }
}

function handleCellClick(row, col) {
    if (isVisualizing) return;
    const cell = grid[row][col];

    if (mode === 'start') {
        if (startCell) {
            startCell.isStart = false;
            startCell.element.classList.remove('start');
        }
        cell.isStart = true;
        cell.element.classList.add('start');
        startCell = cell;
        mode = 'end';
    } else if (mode === 'end') {
        if (endCell) {
            endCell.isEnd = false;
            endCell.element.classList.remove('end');
        }
        cell.isEnd = true;
        cell.element.classList.add('end');
        endCell = cell;
        mode = 'wall';
    } else if (mode === 'wall') {
        cell.isWall = !cell.isWall;
        cell.element.classList.toggle('wall');
    }

    document.getElementById('currentMode').textContent = 
        mode.charAt(0).toUpperCase() + mode.slice(1) + 
        (mode === 'wall' ? ' (Toggle)' : ' Point');
}

function clearGrid() {
    if (isVisualizing) return;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.className = 'cell';
    });

    grid.forEach(row => {
        row.forEach(cell => {
            cell.isWall = false;
            cell.isStart = false;
            cell.isEnd = false;
        });
    });
    
    startCell = null;
    endCell = null;
    mode = 'start';
    document.getElementById('currentMode').textContent = 'Set Start Point';
}

function generateRandomMaze() {
    if (isVisualizing) return;
    clearGrid();
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (Math.random() < 0.3) {
                grid[row][col].isWall = true;
                grid[row][col].element.classList.add('wall');
            }
        }
    }
}

initGrid();