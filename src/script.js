function addDisplayRow(cols) {
  const tableRow = document.createElement("tr");
  for (let i = 0; i < cols; i++) {
    const rowCell = document.createElement("td");
    const numInput = document.createElement("input");
    numInput.type = "number";
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
    numInput.type = "number";
    numInput.value = "0";
    rowCell.appendChild(numInput);
    row.appendChild(rowCell);
  }
}

function delDisplayCol() {
  for (const row of document.querySelectorAll("tr"))
    row.removeChild(row.lastElementChild);
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

  let rows = 1;
  let cols = 1;

  let matrixTable = [[0]];
})();
