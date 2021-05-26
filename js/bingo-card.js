window.onload = initAll;
var usedNums = new Array(76);
var data = new Array();
var maxItems = 0;
const reader = new FileReader();
var versionNumber = 0.7;
var dataFile = "data.csv";

function initAll() {
  var versionElement = document.getElementById("script-version");
  var versionNumText = document.createTextNode(versionNumber);

  versionElement.appendChild(versionNumText);

  getData();
}

function newCard() {
  if (maxItems > 0) {
    for (var i = 0; i < 24; i++) {
      setSquare(i);
    }
  }
}

function getData() {
    var rawFile = new XMLHttpRequest();
    var fileName = "https://jayzosayers.github.io/Livestream-Bingo/datasets/" + dataFile;

    rawFile.open("GET", fileName, false);
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
  var newNum = getNewNum();

  do {
    newNum = getNewNum();
  } while ((usedNums[newNum]) || (newNum >= maxItems));

  usedNums[newNum] = true;
  document.getElementById(currentSquare).innerHTML = data[newNum].value;
}

function getNewNum() {
  var intVal = Math.floor(Math.random() * maxItems);
  return intVal;
}

function anotherCard() {
  for (var i = 1; i < usedNums.length; i++) {
    usedNums[i] = false;
  };

  newCard();
  return false;
}