import { useState, useEffect } from "react";

export default function Grid({ solve, handleSolve, setSolved }) {
  const [clickedCells, setClickedCells] = useState({});
  const [cellValues, setCellValues] = useState({});

  const handleReset = () => {
    setCellValues({});
    setClickedCells({});
    setSolved(false);
  };

  useEffect(() => {
    if (solve) {
      const solvedValues = solveSudoku(cellValues);
      setCellValues(solvedValues);
    }
  }, [solve]);

  const solveSudoku = (inputValues) => {
    const initialGrid = convertValuesToGrid(inputValues);
    const solvedGrid = solveSudokuAlgorithm(initialGrid);
    const solvedValues = convertGridToValues(solvedGrid);
    return solvedValues;
  };

  const solveSudokuAlgorithm = (grid) => {
    const emptyCells = findEmptyCells(grid);

    if (emptyCells.length === 0) {
      return grid;
    }

    const [row, col] = emptyCells[0];

    for (let num = 1; num <= 9; num++) {
      if (isValidMove(grid, row, col, num)) {
        grid[row][col] = num;
        //return the grid after the recursion has finished
        const result = solveSudokuAlgorithm(grid);

        if (result !== null) {
          return result;
        }

        grid[row][col] = 0;
      }
    }

    // If no valid number is found for the current cell, backtrack
    return null;
  };

  // store the coordinates for every single empty cell in the grid
  const findEmptyCells = (grid) => {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push([row, col]);
        }
      }
    }
    return emptyCells;
  };

  const isValidMove = (grid, row, col, num) => {
    return (
      !isInRow(grid, row, num) &&
      !isInColumn(grid, col, num) &&
      !isInSubgrid(grid, Math.floor(row / 3) * 3, Math.floor(col / 3) * 3, num)
    );
  };
  //Convert the array of 81 elements to a grid/matrix of 9 by 9
  const convertValuesToGrid = (inputValues) => {
    const grid = Array.from({ length: 9 }, (_, row) =>
      Array.from(
        { length: 9 },
        (_, col) => Number(inputValues[row * 9 + col + 1]) || 0
      )
    );
    return grid;
  };

  const convertGridToValues = (grid) => {
    const values = grid.flat().reduce((acc, value, index) => {
      if (value !== 0) {
        const cellId = index + 1;
        acc[cellId] = String(value);
      }
      return acc;
    }, {});
    return values;
  };

  const isInRow = (grid, row, num) => {
    return grid[row].includes(num);
  };

  const isInColumn = (grid, col, num) => {
    return grid.some((row) => row[col] === num);
  };

  const isInSubgrid = (grid, startRow, startCol, num) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return true;
        }
      }
    }
    return false;
  };

  const handleCellClick = (id) => {
    setClickedCells((prevClickedCells) => {
      return { ...prevClickedCells, [id]: true };
    });
  };

  const handleInputChange = (id, value) => {
    setCellValues((prevCellValues) => {
      return { ...prevCellValues, [id]: value };
    });
  };

  return (
    <>
      <div className="grid">
        {[...Array(9)].map((_, row) =>
          [...Array(9)].map((_, col) => {
            // const cellId = `${row}${col}`;
            const cellId = row * 9 + col + 1;
            const isClicked = clickedCells[cellId];
            const cellValue = cellValues[cellId];

            return (
              <div
                key={cellId}
                className={`cell ${isClicked ? "clicked" : ""}`}
                id={cellId}
                onClick={() => handleCellClick(cellId)}
              >
                {isClicked ? (
                  <input
                    className="input-field"
                    type="text"
                    value={cellValue || ""}
                    onChange={(e) => handleInputChange(cellId, e.target.value)}
                    onBlur={() =>
                      setClickedCells({ ...clickedCells, [cellId]: false })
                    }
                  />
                ) : (
                  <span className="cell-value">{cellValue}</span>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleSolve}>
          SOLVE
        </button>
        <button className="reset-btn" onClick={handleReset}>
          RESET GRID
        </button>
      </div>
    </>
  );
}
