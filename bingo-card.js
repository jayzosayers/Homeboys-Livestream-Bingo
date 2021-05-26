window.onload = initAll;
var usedNums = new Array(76);
var data = new Array();
var maxItems = 0;
const reader = new FileReader();
var versionNumber = 0.7;

function initAll() {
  var versionElement = document.getElementById("script-version");
  var versionNumText = document.createTextNode(versionNumber);

  versionElement.appendChild(versionNumText);

  getData();
}

function newCard() {
  for (var i = 0; i < 24; i++) {
    setSquare(i);
  }
}

function getData() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./data.csv", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                data = csvToArray(allText);
                maxItems = data.length;

                if (document.getElementById) {
                  document.getElementById("reload").onclick = anotherCard;
                  newCard();
                }
                else {
                  alert("Your browser does not support this script.");
                }
            }
        }
    }
    rawFile.send(null);
}

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

function setSquare(thisSquare) {
  var currentSquare = "square" + thisSquare;
  var colPlace = new Array(0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4);
  var colBasis = colPlace[thisSquare] * 15;
  var newNum = colBasis + getNewNum() + 1;

  do {
    newNum = colBasis + getNewNum() + 1;
    console.log(data[newNum] + " | " + newNum);
  } while ((usedNums[newNum]) || (newNum >= maxItems));

  usedNums[newNum] = true;
  document.getElementById(currentSquare).innerHTML = data[newNum];
}

function getNewNum() {
  return Math.floor(Math.random() * 15);
}

function anotherCard() {
  for (var i = 1; i < usedNums.length; i++) {
    usedNums[i] = false;
  };

  newCard();
  return false;
}