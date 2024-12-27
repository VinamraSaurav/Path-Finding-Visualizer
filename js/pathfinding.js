function getNeighbors(cell) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    return directions
        .map(([dr, dc]) => ({
            row: cell.row + dr,
            col: cell.col + dc
        }))
        .filter(({row, col}) => 
            row >= 0 && row < GRID_SIZE && 
            col >= 0 && col < GRID_SIZE &&
            !grid[row][col].isWall);
}
