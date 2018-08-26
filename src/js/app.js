// Importing css
import '../css/style.css';
// Importing from different js file
import {
    addRow,
    addCol,
    delRow,
    delCol,
    calSum,
    calDiff,
    calMul,
    calDiv,
    calMod,
    exportToCSV
} from './dom-loader.js';
var isMouseDown, isHighlighted;
// Declaring number of rows and cols to be displayed on page load
var defrows = 8,
    defcolumns = 5;
// Function to be called on page load 
var init = (event) => {

    loadTable(event);
    // Calculate height
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementById('header').clientHeight;
    let footerHeight = document.getElementById('footer').clientHeight;
    // Append total height to the window screen
    let totalHeight = windowHeight - headerHeight - footerHeight;
    document.getElementById("mainContent").setAttribute('style', 'min-height: ' + totalHeight + 'px');
}

window.onload = function (event) {
    init(event);
};
// Loads the Default Table on Page Load
var loadTable = (event) => {
    let tablearea = document.getElementById('table');
    let table = document.createElement('table');
    // Assign id to table
    table.setAttribute("id", "tableId");
    let tbody = document.createElement('tbody');
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Load for rows
    for (let i = 0; i <= defrows; i++) {
        let tr = document.createElement('tr');
        // Assign id to row
        tr.setAttribute("id", "tr_" + i);
        if (i > 0) {
            // Load for columns
            for (let j = 0; j <= defcolumns; j++) {
                let td = document.createElement('td');

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
                
                eventHandlersTd(td, event);
                if (j > 0) {
                    // Makes all the cells except the first cell as an input
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    td.appendChild(x);
                    // Assign id to cell
                    td.setAttribute("id", str.charAt(j - 1) + i);
                } else {
                    // Adds numbers in the first column of each row
                    let x = document.createTextNode(i);
                    td.appendChild(x);
                }
                tr.appendChild(td);
            }
        } else {
            for (let j = 0; j <= defcolumns; j++) {
                let th = document.createElement('th');
                if (j > 0) {
                    // Adds alphabets as the name of the columns
                    let x = document.createTextNode(str.charAt(j - 1));
                    th.appendChild(x);
                } else {
                    // First column of first row is made empty
                    let x = document.createTextNode("");
                    th.appendChild(x);
                }
                tr.appendChild(th);
            }
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    tablearea.appendChild(table);
}

// Buttons used on the index page
addRow.addEventListener('click', insertRow);
addCol.addEventListener('click', insertColumn);
delRow.addEventListener('click', removeRow);
delCol.addEventListener('click', removeCol);

calSum.addEventListener('click', calculateSum);
calDiff.addEventListener('click', calculateDifference);
calMul.addEventListener('click', calculateMultiplication);
calDiv.addEventListener('click', calculateDivision);
calMod.addEventListener('click', calculateModulus);

exportToCSV.addEventListener('click', exportTableToCSV);

document.onmouseup = myMouseUpHandler;

function myMouseUpHandler() {
    isMouseDown = false;
}

var eventHandlersTd = (td, event) => {
    //Double Click to select Cells to Delete
    td.addEventListener('dblclick', function (event) {
        if (event.isTrusted) {
            // td.classList.remove("selected");
            td.classList.toggle("highlight");
            // if(td.classList.contains("formula")) {
            //     td.classList.remove("highlight");
            // };
        }
    });
    //On Change of Event To Check for Arithmatic Operations
    td.addEventListener('change', function (event) {
        if (event.isTrusted) {
            // For Addition
            if (td.querySelector('input').value.toLowerCase().indexOf("=sum")==0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findSum(td.id, array[0], array[1]);
                    }
                }
            }
            // For Difference
            if (td.querySelector('input').value.toLowerCase().indexOf("=diff")==0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiff(td.id, array[0], array[1]);
                    }
                }
            }
            // For Multiplication
            if (td.querySelector('input').value.toLowerCase().indexOf("=mul")==0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMul(td.id, array[0], array[1]);
                    }
                }
            }
            // For Division
            if (td.querySelector('input').value.toLowerCase().indexOf("=div")==0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findDiv(td.id, array[0], array[1]);
                    }
                }
            }
            // For Modulus
            if (td.querySelector('input').value.toLowerCase().indexOf("=mod")==0) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(td.querySelector('input').value);
                if (matches) {
                    // Adds range in the array
                    let array = matches[1].toUpperCase().split(',');
                    if (array.length == 2) {
                        findMod(td.id, array[0], array[1]);
                    }
                }
            }
            // This function is called when cells are updated
            updateOperation();
        }
    });
}

var updateOperation = () => {
    //To check if Any Update is made to any other cells
    let formulacells = document.getElementsByClassName("formula");
    for (let i = 0; i < formulacells.length; i++) {
        let dataId = formulacells[i].id;
        // Gets the data attribute
        let dataFormula = formulacells[i].dataset.formula;
        // For Addition
        if (dataFormula.toLowerCase().indexOf("=sum")==0) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findSum(dataId, array[0], array[1]);
                }
            }
        }
        // For Difference
        if (dataFormula.toLowerCase().indexOf("=diff")==0) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findDiff(dataId, array[0], array[1]);
                }
            }
        }
        // For Multiplication
        if (dataFormula.toLowerCase().indexOf("=mul")==0) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findMul(dataId, array[0], array[1]);
                }
            }
        }
        // For Division
        if (dataFormula.toLowerCase().indexOf("=div")==0) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findDiv(dataId, array[0], array[1]);
                }
            }
        }
        // For Modulus
        if (dataFormula.toLowerCase().indexOf("=mod")==0) {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(dataFormula);
            if (matches) {
                // Adds range in the array
                let array = matches[1].toUpperCase().split(',');
                if (array.length == 2) {
                    findMod(dataId, array[0], array[1]);
                }
            }
        }
    }
}
//Calculates the Sum 
var findSum = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        // Row id of first parameter in the range
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        let firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate sum
            let sum = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let val1 = cellsarea[i].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    val1 = 0;
                }
                sum += parseFloat(val1);
            }
            document.getElementById(id).querySelector('input').value = sum;
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate sum
            let sum = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val2 = 0;
                    }
                    sum += parseFloat(val2);
                }
            }
            document.getElementById(id).querySelector('input').value = sum;
        }
    }
}
//Calculates the Difference
var findDiff = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        // Row id of first parameter in the range
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        let firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate difference
            let diff;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                let val1 = cellsarea[i].querySelector('input').value;
                if (i > firstNumber) {
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    diff -= parseFloat(val1);
                    value_1 = diff;
                }
                diff = value_1;
            }
            document.getElementById(id).querySelector('input').value = diff;
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate difference
            let diff;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    if (j > parseInt(rowNumber1)) {
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;

                        }
                        diff -= parseFloat(val2);
                        value_1 = diff;
                    }
                    diff = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = diff;
        }
    }
}
//Calculates the Multiplication
var findMul = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        // Row id of first parameter in the range
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        let firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate multiplication
            let total;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total *= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
            }
            document.getElementById(id).querySelector('input').value = total;
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate multiplication
            let total;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal2 = 0;
                }
                if (colNumber > 0) {
                    value_1 = parseFloat(cellsVal2);
                    let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val2 = 0;
                    }
                    if (j > parseInt(rowNumber1)) {

                        total *= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Calculates the Division
var findDiv = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        // Row id of first parameter in the range
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        let firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate division
            let total = 0;
            let value_1 = 0;

            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total /= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate division
            let total = 0;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;
                        }
                        total /= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Calculates the Modulus
var findMod = (id, x, y) => {
    if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;
        // Row id of first parameter in the range
        let fnumber = document.getElementById(x).parentNode.id.split("_");
        // Row id of second parameter in the range
        let lnumber = document.getElementById(y).parentNode.id.split("_");
        // First letter of the first parameter of the range
        let firstLetter = document.getElementById(x).id;
        // First letter of the second parameter of the range
        let lastLetter = document.getElementById(y).id;
        let tablearea = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        rowNumber1 = match1[0];
        // Starting range while calculating for columns
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fnumber[1] == lnumber[1]) {
            let cellsarea = tablearea.rows[fnumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // Login to calculate modulus
            let total = 0;
            let value_1 = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let cellsVal1 = cellsarea[firstNumber].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (cellsVal1 == "" || !cellsVal1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    cellsVal1 = 0;
                }
                value_1 = parseFloat(cellsVal1);
                if (i > firstNumber) {
                    let val1 = cellsarea[i].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val1 = 0;
                    }
                    total %= parseFloat(val1);
                    value_1 = total;
                }
                total = value_1;
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate modulus
            let total = 0;
            let value_1 = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let cellsVal2 = tablearea.rows[parseInt(rowNumber1)].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (cellsVal2 == "" || !cellsVal2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        cellsVal2 = 0;
                    }
                    value_1 = parseFloat(cellsVal2);
                    if (j > parseInt(rowNumber1)) {
                        let val2 = tablearea.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                        // Only accept positive, negative and float numbers, else the value will be made 0
                        if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                            val2 = 0;
                        }
                        total %= parseFloat(val2);
                        value_1 = total;
                    }
                    total = value_1;
                }
                if(isNaN(total)) {
                    total = 0;
                }
            }
            document.getElementById(id).querySelector('input').value = total;
        }
    }
}
//Function to Insert a Column
function insertColumn(event) {
    if (event.isTrusted) {
        let tablearea = document.getElementById('table');
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Login to insert column in each row
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                let td = tr[i].insertCell();

                // td.addEventListener('mousedown', function () {
                //     if (event.isTrusted) {
                //         isMouseDown = true;
                //         td.classList.toggle("selected");
                //         isHighlighted = td.classList.contains("selected");
                //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
                //             td.classList.remove("selected");
                //         }
                //         return false;
                //     }
                // });

                // td.addEventListener('mouseover', function () {
                //     if (event.isTrusted) {
                //         if (isMouseDown) {
                //             td.classList.toggle("selected", isHighlighted);
                //         }
                //     }
                // });
        
                eventHandlersTd(td);
                // Make cell as an input element
                let x = document.createElement("INPUT");
                x.setAttribute("type", "text");
                td.appendChild(x);
                // Assign id to cell
                td.setAttribute("id", str.charAt(tr[0].cells.length - 2) + i);
            } else {
                let th = document.createElement("th");
                // Columns in first row will be assigned by a letter
                let x = document.createTextNode(str.charAt(tr[0].cells.length - 1));
                th.appendChild(x);
                tr[i].appendChild(th);
            }
        }
    }
}
//Function to Insert Row
function insertRow(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        // Assign id to row
        row.setAttribute("id", "tr_" + rowCount);
        // Add cells in each newly added row
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}
//Insert the cells
function createCell(cell, count, rowCount) {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // If its not the first column, make cell as an input type
    if (count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        // Assign id to each cell
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);
    } else {
        // If first cell of the row, assign the number as the position of the row
        let x = document.createTextNode(rowCount);
        cell.appendChild(x);
    }

    // cell.addEventListener('mousedown', function () {
    //     if (event.isTrusted) {
    //         isMouseDown = true;
    //         cell.classList.toggle("selected");
    //         isHighlighted = cell.classList.contains("selected");
    //         if(td.classList.contains("formula") || td.classList.contains("highlight")) {
    //             td.classList.remove("selected");
    //         }
    //         return false;
    //     }
    // });

    // cell.addEventListener('mouseover', function () {
    //     if (event.isTrusted) {
    //         if (isMouseDown) {
    //             cell.classList.toggle("selected", isHighlighted);
    //         }
    //     }
    // });

    eventHandlersTd(cell);
}
//Deletes the Row and Updates the Table with Headers and Cells Ids
function removeRow(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        // Check if the row is selected
        if (selectedCells.length > 0) {
            let r = selectedCells[0].parentNode.id;
            // Get the row id
            let s = r.split("_");
            table.deleteRow(s[1]);

            let l = parseInt(s[1]);
            // Update the text of the first cell of each row
            for (let i = l + 1; i <= table.rows.length; i++) {
                //console.log("Rows length"+ table.rows.length);
                let rw = document.getElementById("tr_" + i);
                rw.setAttribute("id", "tr_" + (i - 1));
                //for(let j = 0; j <= table.rows.length; j++){
                let cells = rw.getElementsByTagName("td");
                cells[0].innerText = i - 1;
                //defrows--;
                //console.log(cells[1].id);
                // Update the id of each cells
                for (let j = 1; j < cells.length; j++) {
                    let ind = cells[j].id;
                    // console.log(ind);
                    let alpha = ind.split("");
                    let regex = /[+-]?\d+(?:\.\d+)?/g;
                    
                    let match = regex.exec(ind);
                   
                    let new_id = alpha[0] + (match[0] - 1);


                    cells[j].setAttribute("id", new_id);

                }
            }
            // This function is called when cells are updated
            updateOperation();
        // If row not selected
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Deletes the Columns and Updates the Headers and Cell Ids
function removeCol(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let selectedCells = document.getElementsByClassName("highlight");
        // Check if column is selected
        if (selectedCells.length > 0) {
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let col = selectedCells[0].id;
            let colInd = col.split("");
            let ind = str.indexOf(colInd[0]);
            let rowsDom = document.getElementsByTagName("tr");
            // Delete the particular column position from all the rows
            for (let i = 0; i < table.rows.length; i++) {
                rowsDom[i].deleteCell(ind + 1);
                if (i > 0) {
                    let colDom = rowsDom[i].getElementsByTagName("td");
                    // Assign id to all the cells
                    for (let m = ind + 1; m < colDom.length; m++) {
                        let indexCol = colDom[m].id;
                        let alpha = indexCol.split("");
                        let regex = /[+-]?\d+(?:\.\d+)?/g;
                        let match = regex.exec(indexCol);
                        regex.leftIndex = 0;
                        let new_id = str[m - 1] + (match[0]);
                        colDom[m].setAttribute("id", new_id);
                    }
                }
            }
            // Reassign the letter as the name to the header of the table
            let head = document.getElementsByTagName("th");
            for (let j = ind + 1; j < head.length; j++) {
                head[j].innerText = str[j - 1];
            }
            // This function is called when cells are updated            
            updateOperation();
        // If column not selected 
        } else {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = "Please select the cell first";
            setTimeout(function () {
                document.getElementById("result").style.display = "none";
            }, 3500);
        }
    }
}
//Additional Sum Function Implemented
function calculateSum(event) {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseFloat(selectedCells[i].querySelector('input').value);
        }
        document.getElementById("result").innerHTML = "The calculted sum is : " + sum;
    }
}
//Additional Difference Function Implemented
function calculateDifference(event) {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let diff;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                diff -= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = diff;
            }
            diff = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted difference is : " + diff;
    }
}
//Additional Multiplication Function Implemented
function calculateMultiplication(event) {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total *= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted multiplcation is : " + total;
    }
}
//Additional Division Function Implemented
function calculateDivision(event) {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total /= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted division is : " + total;
    }
}
//Additional Modulus Function Implemented
function calculateModulus(event) {
    if (event.isTrusted) {
        let selectedCells = document.getElementsByClassName("selected");
        let length = selectedCells.length;
        let total;
        let value_1 = 0;
        for (let i = 0; i < length; i++) {
            value_1 = parseFloat(selectedCells[0].querySelector('input').value);
            if (i > 0) {
                total %= parseFloat(selectedCells[i].querySelector('input').value);
                value_1 = total;
            }
            total = value_1;
        }
        document.getElementById("result").innerHTML = "The calculted modulus is : " + total;
    }
}
//Export to CSV Functions
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    if (navigator.msSaveBlob) {    
        navigator.msSaveBlob(csvFile, filename);
    } else {

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }
}
//Export CSV Main Function
function exportTableToCSV(event) {
    if (event.isTrusted) {
        let filename = 'spreadsheet.csv';
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            let row = [];
            if (i > 0) {
                let cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                let cols = rows[i].querySelectorAll("th");
                for (let j = 0; j < cols.length; j++) {
                    row.push(cols[j].innerText);
                }
            }
            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
}