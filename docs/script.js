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

function fracToTex(frac) {
  const f = frac.reduce();
  if (f.denom === 1)
    return f.num.toString();
  else if (f.num > 0)
    return `\\frac{${f.num}}{${f.denom}}`;
  else
    return `-\\frac{${-f.num}}{${f.denom}}`
}

function matrixTex(matrix) {
  return `\\[\\begin{bmatrix}${
    matrix.map(r => r.map(c => fracToTex(c)).join("&")).join("\\\\")
  }\\end{bmatrix}\\]`;
}

function convert(rows, cols) {
  const matrix = new Matrix(rows, cols);
  const inputs = document.querySelectorAll("table input");
  for (const i of inputs.keys()) {
    if (/^-?\d+$/.test(inputs[i].value)) {
      matrix[Math.floor(i / cols)][i % cols] = new Fraction(
        Number(inputs[i].value), 1);
    } else if (/^-?\d+\/-?\d+$/.test(inputs[i].value)) {
      matrix[Math.floor(i / cols)][i % cols] = new Fraction(
        ...inputs[i].value.split("/").map(x => Number(x)));
    }
  }

  const output = document.querySelector("#output");
  output.innerHTML = "";

  const original = document.createElement("div");
  original.innerHTML = "<h2>Original matrix</h2>" + matrixTex(matrix);
  const converted = document.createElement("div");
  converted.innerHTML = "<h2>Converted matrix</h2>" + matrixTex(matrix.rref());
  output.appendChild(original);
  output.appendChild(converted);
  MathJax.typeset();
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
