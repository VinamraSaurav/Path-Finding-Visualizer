function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearVisualization() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.classList.contains('visited') || cell.classList.contains('path')) {
            cell.classList.remove('visited', 'path');
        }
    });
}

async function visualizePath(path) {
    for (let i = path.length - 2; i > 0; i--) {
        const cell = grid[path[i].row][path[i].col];
        cell.element.classList.add('path');
        await delay(50);
    }
}

async function visualizeBFS() {
    if (!startCell || !endCell || isVisualizing) return;
    isVisualizing = true;
    clearVisualization();

    const queue = [[startCell]];
    const visited = new Set([`${startCell.row},${startCell.col}`]);

    while (queue.length > 0 && isVisualizing) {
        const currentPath = queue.shift();
        const currentCell = currentPath[currentPath.length - 1];

        if (currentCell === endCell) {
            await visualizePath(currentPath);
            isVisualizing = false;
            return;
        }

        const neighbors = getNeighbors(currentCell);
        for (const neighbor of neighbors) {
            const neighborCell = grid[neighbor.row][neighbor.col];
            const neighborKey = `${neighbor.row},${neighbor.col}`;
            
            if (!visited.has(neighborKey)) {
                visited.add(neighborKey);
                const newPath = [...currentPath, neighborCell];
                queue.push(newPath);
                
                if (neighborCell !== endCell) {
                    neighborCell.element.classList.add('visited');
                    await delay(20);
                }
            }
        }
    }
    isVisualizing = false;
}

async function visualizeDFS() {
    if (!startCell || !endCell || isVisualizing) return;
    isVisualizing = true;
    clearVisualization();

    const visited = new Set();
    const parent = new Map();

    async function dfs(current) {
        if (current === endCell) {
            const path = [];
            let curr = current;
            while (curr) {
                path.push(curr);
                curr = parent.get(curr);
            }
            await visualizePath(path);
            return true;
        }

        visited.add(`${current.row},${current.col}`);
        if (current !== startCell) {
            current.element.classList.add('visited');
            await delay(20);
        }

        for (const neighbor of getNeighbors(current)) {
            const neighborCell = grid[neighbor.row][neighbor.col];
            if (!visited.has(`${neighbor.row},${neighbor.col}`)) {
                parent.set(neighborCell, current);
                if (await dfs(neighborCell)) {
                    return true;
                }
            }
        }
        return false;
    }

    await dfs(startCell);
    isVisualizing = false;
}
