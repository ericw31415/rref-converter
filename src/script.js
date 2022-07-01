function addDisplayRow(cols) {
  const tableRow = document.createElement("tr");
  for (let i = 0; i < cols; i++) {
    const rowCell = document.createElement("td");
    const numInput = document.createElement("input");
    numInput.type = "text";
    numInput.value = "0";
    rowCell.appendChild(numInput);
    tableRow.appendChild(rowCell);
  }

  const tableRows = document.querySelectorAll("tr");
  document.querySelector("tbody").insertBefore(
    tableRow, tableRows[tableRows.length - 1].nextSibling);
}

function delDisplayRow() {
  const tableBody = document.querySelector("tbody");
  tableBody.removeChild(tableBody.lastElementChild);
}

function addDisplayCol() {
  for (const row of document.querySelectorAll("tr")) {
    const rowCell = document.createElement("td");
    const numInput = document.createElement("input");
    numInput.type = "text";
    numInput.value = "0";
    rowCell.appendChild(numInput);
    row.appendChild(rowCell);
  }
}

function delDisplayCol() {
  for (const row of document.querySelectorAll("tr"))
    row.removeChild(row.lastElementChild);
}

function firstNonZero(matrix, start, col) {
  for (let i = start; i < matrix.rows; i++) {
    if (matrix[i][col] !== 0)
      return i;
  }
  return null;
}

function printMatrix(matrix) {
  console.log(JSON.stringify(matrix));
  //document.body.innerHTML += `\\[\\begin{bmatrix}${matrix.map(x => x.join("&")).join("\\\\")}\\end{bmatrix}\\]`;
}

function convert(rows, cols) {
  const matrix = new Matrix(rows, cols);
  const inputs = document.querySelectorAll("table input");
  for (const i of inputs.keys()) {
    if (/^\d+$/.test(inputs[i].value)) {
      matrix[Math.floor(i / cols)][i % cols] = new Fraction(
        Number(inputs[i].value), 1);
    } else if (/^\d+\/\d+$/.test(inputs[i].value)) {
      matrix[Math.floor(i / cols)][i % cols] = new Fraction(
        ...inputs[i].value.split("/").map(x => Number(x)));
    }
  }

  // document.body.appendChild(document.createElement("h2").appendChild(document.createTextNode("Original Matrix")));
  printMatrix(matrix);
  printMatrix(matrix.rref());

  /*
  // Gaussian elimination
  let i = 0;
  let j = 0;
  while (j < cols) {
    const nonZero = firstNonZero(matrix, i, j);
    if (nonZero === null) {
      console.log("done");
    } else {
      if (nonZero !== i)
        matrix.swap(i, nonZero);
      if (Math.abs(matrix[i][j]) > 10 * Number.EPSILON)
        matrix.scale(i, 1 / matrix[i][j]);

      // Clear column
      for (let row = 0; row < rows; row++) {
        if (row !== i)
          matrix.addToRow(i, row, -matrix[row][j]);
      }

      i++;
    }
    console.log(i, j, JSON.parse(JSON.stringify(matrix)));
    console.log(matrix);
    j++;
  }*/

  // for (let j = 0; j < cols; j++) {
  //   for (let i = 0; i < rows; i++) {
  //     const nonZero = firstNonZero(matrix, i, j);
  //     if (nonZero !== null) {
  //       if (nonZero[0] !== i) {
  //         matrix.swap()
  //       }
  //     } else{console.log("done")}
  //   }
  // }

  // for (let i = 0; i < rows; i++) {
  //   const nonZero = firstNonZero(matrix, i);
  //   if (nonZero !== null) {
  //     if (nonZero[0] !== i)
  //       matrix.swap(i, nonZero[0]);
  //       matrix.scale(i, 1 / matrix[i][0]);
  //   } else{console.log("done")}
  //   console.log(i, nonZero, matrix);
  // }

  // for (row of matrix) {
  //   for (col in row) {

  //   }
  // }
}

(function() {
  function changeRows() {
    const newRows = Number(document.querySelector("#rows").value);

    if (newRows > rows) {
      // Add row
      matrixTable.push(new Array(cols));
      matrixTable[matrixTable.length - 1].fill(0);
      addDisplayRow(cols);
    } else {
      // Delete last row
      matrixTable.pop();
      delDisplayRow();
    }
    rows = newRows;
  }

  function changeCols() {
    const newCols = Number(document.querySelector("#cols").value);

    if (newCols > cols) {
      // Add column
      for (const row of matrixTable)
        row.push(0);
        addDisplayCol();
    } else {
      // Delete last column
      for (const row of matrixTable)
        row.pop();
        delDisplayCol();
    }
    cols = newCols;
  }

  document.querySelector("#rows").addEventListener("change", changeRows);
  document.querySelector("#cols").addEventListener("change", changeCols);
  document.querySelector("#convert").addEventListener("click",
    e => {
      convert(rows, cols);
    });

  let rows = 1;
  let cols = 1;

  let matrixTable = [[0]];
})();
