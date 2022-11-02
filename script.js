/*
    @Params 
    min_count: minimum number of rows or cols
    max_count: maxmimum number of rows or cols

    Description: Sets array so that first value is 0 (unless min is 0)
*/
function setArray(min_count, max_count) {
    let arr = [];

    if (min_count != 0) {
        arr.push(0);
    }

    for (let i = min_count; i <= max_count; i++) {
        arr.push(i);
    }

    return arr;
}

/*
    @Params 
    min_row: minimum number of rows
    max_row: maximum number of rows
    min_col: minimum number of columns
    max_col: maximum number of columns

    Description: runs tests on the inputs
*/
function tests(min_row, max_row, min_col, max_col) {
    if (
        !(Number.isInteger(min_col)) ||
        !(Number.isInteger(max_col)) ||
        !(Number.isInteger(min_row)) ||
        !(Number.isInteger(max_row))
    ) {
        throw new Error("[TYPE_ERROR] One of the inputted values is not a number")
    } else if (
        (min_row < -50 || min_row > 50) ||
        (max_row < -50 || max_row > 50) ||
        (min_col < -50 || min_col > 50) ||
        (max_col < -50 || max_col > 50)
    ) {
        throw new Error("[BOUNDS_ERROR] Your input values must be -50 to 50")
    }
}

/* 
    Description: Starter function which generates the table
*/
function generateTable() {
    // Checks to see if table already exists, if it does remove it via DOM
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
    }

    // Creation of table element
    const table = document.createElement('table');

    // Stores input value's into variables
    const min_col_count = Number(document.getElementById("min-col").value);
    const max_col_count = Number(document.getElementById("max-col").value);
    const min_row_count = Number(document.getElementById("min-row").value);
    const max_row_count = Number(document.getElementById("max-row").value);

    // Initializes col and row arrays
    const col_arr = setArray(min_col_count, max_col_count);
    const row_arr = setArray(min_row_count, max_row_count);

    // Runs input tests
    tests(min_col_count, max_col_count, min_row_count, max_row_count);

    for (let i = 0; i < row_arr.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < col_arr.length; j++) {
            const col = document.createElement('td');

            // Multplying i x j 
            let val = row_arr[i] * col_arr[j];

            // Gives styling to first row and columns
            if (i === 0 || j === 0) {
                val = row_arr[i] || col_arr[j];
                col.classList.add('header');
            }

            // If first cell, set value to empty char, else set to val
            if (i === 0 && j === 0) val = '';

            // Make the td's innerHTML value equal to value
            col.innerHTML = val;
            row.appendChild(col);
        }
        // Add the row to the HTML
        table.appendChild(row);
    }
    // Adds table to table-container div which houses scroll properties
    const container = document.getElementById("table-container");
    container.appendChild(table);
    // Prevents reload on submit
    event.preventDefault();
}
