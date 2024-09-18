"use strict";

//css Spielfelder einlesen
const playGround = document.getElementsByClassName("play-ground");
//css Spieler Anzeige
const h1spieler = document.querySelector("#welcherSpieler>h1");
// css neues Spiel button
const neuesSpiel = document.getElementById("neuesSpiel");
// Maße des Spielfelds in Feldern festlegen:
const maxCols = 7;
const maxRows = 6;
// Initialisierung des Spielfeld Arrays
let spielfeld = new Array(maxRows);
//Initialisierung des 1. Spielers
let spieler = "Spieler-1";
//Wie oft wurde ein Chip eingeworfen, bei 42 ist Schluss
let anzClicks = 0;
//Variable speichert den Sieger
let gibtGewinner = "";

// Das Css Spielfeld wurde geladen
window.onload = () => {
  // 2.Dimension des Spielfeldes
  for (let i = 0; i < spielfeld.length; i++) {
    spielfeld[i] = new Array(maxCols);
  }
  // Initialisierung der Schaltflächen für den Chip-Einwurf
  for (let i = 0; i < maxCols; i++) {
    // id der slots reicht von slot-0 bis slot-6
    let strI = "slot-" + i.toString();
    //console.log(playGround[0].children[i]);
    playGround[0].children[i].children[0].id = strI;
    playGround[0].children[i].children[0].onclick = ClickFunction;
  }
  // Verknüpfen von IDs mit Array Koordinaten
  // Nullpunkt ist oben links
  // id der rows reicht von 0 bis 5
  for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
    // id der columns reicht von 0 bis 6
    for (let colIndex = 0; colIndex < maxCols; colIndex++) {
      let strRowCol = rowIndex.toString() + colIndex.toString();
      //Felder erhalten eine ID im Format "column"+"row"
      playGround[0].children[rowIndex * maxCols + colIndex + 7].children[0].id =
        strRowCol;
    }
  }
  //Alle Spielfelder leeren und als schwarze Löcher darstellen
  //Äußere Schleife durchläuft alle Zeilen
  for (let rows = 0; rows < maxRows; rows++) {
    //Innere Schleife durchläuft alle Spalten
    for (let cols = 0; cols < maxCols; cols++) {
      spielfeld[rows][cols] = "N";

      // // String für die Suche nach dem Element mit der id colrow erstellen
      // let strColRow = cols.toString() + rows.toString();
      // // Element mit der id colrow finden
      // let aktField = document.getElementById(strColRow);
      // // dem aktuellen Element die Klasse chip-black zuweisen
      // // sorgt für ein leeres Spielfeld (schwarze Löcher)
      // aktField.classList.add("chip-black");
    }
  }
  mapArray();
};

const mapArray = function () {
  let field;
  let strClass;
  let strColRow;
  let actField;
  for (let rows = 0; rows < maxRows; rows++) {
    for (let cols = 0; cols < maxCols; cols++) {
      field = spielfeld[rows][cols];
      strClass = "";
      strColRow = rows.toString() + cols.toString();
      switch (field) {
        case "N":
          strClass = "chip-black";
          break;
        case "R":
          strClass = "chip-red";
          break;
        case "Y":
          strClass = "chip-yellow";
          break;
      }
      actField = document.getElementById(strColRow);
      actField.classList.remove("chip-black");
      actField.classList.add(strClass);
    }
  }
};

const calcRow = function (col) {
  let lastFreeRow = 0;
  while (lastFreeRow < maxRows) {
    if (spielfeld[lastFreeRow][col] !== "N") {
      console.log(lastFreeRow);
      return lastFreeRow - 1;
    }
    lastFreeRow++;
  }
  return 5;
};

function ClickFunction(item) {
  let col;
  if (item.target !== item.currentTarget) return;
  col = item.target.id.slice(-1) * 1;

  spielfeld[calcRow(col)][col] = "Y";

  mapArray();
}
//   for (let i = 0; i < 6; i++) {
//     let strI = "row-" + i.toString();
//     tableRows[i].id = strI;
//     for (let j = 0; j < 7; j++) {
//       let strJ = "col-" + j.toString();
//       tableRows[i].children[j].id = strJ;
//       let strIJ = j.toString() + i.toString();
//       tableRows[i].children[j].children[0].children[0].id = strIJ;
//       tableRows[i].children[j].children[0].children[0].onclick = ClickFunction;
//       spielfeld[i][j] = "";
//     }
//   }

//   h1spieler.innerHTML = "Grün ist am Zug:";
//   anzClicks = 0;
// };

// function ClickFunction(ding) {
//   let col = (ding.target.id - (ding.target.id % 10)) / 10;
//   let row = ding.target.id % 10;
//   let newRow;
//   anzClicks++;

//   if (spieler === "Spieler-1") {
//     ding.target.src = "./media/GreenChip100x100.png";
//     h1spieler.innerHTML = "Rot ist am Zug:";
//     spieler = "Spieler-2";
//     newRow = getSlotPlace(col);
//     spielfeld[newRow][col] = "G";
//     gibtGewinner = isGewinner(1, row, col);
//   } else {
//     ding.target.src = "./media/RedChip100x100.png";
//     h1spieler.innerHTML = "Grün ist am Zug:";
//     spieler = "Spieler-1";
//     newRow = getSlotPlace(col);
//     spielfeld[newRow][col] = "R";
//     gibtGewinner = isGewinner(-1, row, col);
//   }

//   ding.target.onclick = "";

//   if (anzClicks === 42) {
//     h1spieler.innerHTML = "Unentschieden!";
//     neuesSpiel.children[0].style.opacity = 1;
//     neuesSpiel.onclick = funcNewGame;
//     console.log(spielfeld);
//   }
//   if (gibtGewinner === "Grün gewinnt!") {
//     h1spieler.innerHTML = gibtGewinner;
//     killOnclick();
//     neuesSpiel.children[0].style.opacity = 1;
//     neuesSpiel.onclick = funcNewGame;
//   }

//   if (gibtGewinner === "Rot gewinnt!") {
//     h1spieler.innerHTML = gibtGewinner;
//     killOnclick();
//     neuesSpiel.children[0].style.opacity = 1;
//     neuesSpiel.onclick = funcNewGame;
//   }
// }

// function funcNewGame() {
//   window.location.reload();
// }

// function isGewinner(nrspieler, row, col) {
//   let result = "";
//   if (
//     sucheSpalte(row, col) ||
//     sucheReihe(row, col) ||
//     sucheDiagLinks(row, col) ||
//     sucheDiagRechts(row, col)
//   ) {
//     if (nrspieler === 1) {
//       result = "Grün gewinnt!";
//     } else {
//       result = "Rot gewinnt!";
//     }
//   }
//   return result;
// }

// function killOnclick() {
//   for (let i = 0; i < 42; i++) {
//     tableImgs[i].onclick = "";
//   }
// }

// function sucheSpalte(row, col) {
//   let z = row;
//   let k = row + 1;
//   const oben = [];
//   const unten = [];
//   let gesSpalte = [];
//   while (z >= 0) {
//     oben.push(spielfeld[z][col]);
//     z--;
//   }
//   while (k < 6) {
//     unten.push(spielfeld[k][col]);
//     k++;
//   }
//   gesSpalte = unten.reverse().concat(oben);
//   return gewinntVier(gesSpalte);
// }

// function sucheReihe(row, col) {
//   let z = col;
//   let k = col + 1;
//   const links = [];
//   const rechts = [];
//   let gesReihe = [];
//   while (z >= 0) {
//     links.push(spielfeld[row][z]);
//     z--;
//   }
//   while (k < 7) {
//     rechts.push(spielfeld[row][k]);
//     k++;
//   }
//   gesReihe = links.reverse().concat(rechts);
//   return gewinntVier(gesReihe);
// }

// function sucheDiagLinks(row, col) {
//   let z = col;
//   let k = row;
//   const linksOben = [];
//   const rechtsUnten = [];
//   let gesReihe = [];
//   while (k >= 0 && z >= 0) {
//     linksOben.push(spielfeld[k][z]);
//     k--;
//     z--;
//   }
//   z = col + 1;
//   k = row + 1;
//   while (k < 6 && z < 7) {
//     rechtsUnten.push(spielfeld[k][z]);
//     k++;
//     z++;
//   }
//   gesReihe = linksOben.reverse().concat(rechtsUnten);
//   return gewinntVier(gesReihe);
// }

// function sucheDiagRechts(row, col) {
//   let z = col;
//   let k = row;
//   const rechtsOben = [];
//   const linksUnten = [];
//   let gesReihe = [];
//   while (k >= 0 && z < 7) {
//     rechtsOben.push(spielfeld[k][z]);
//     k--;
//     z++;
//   }
//   z = col - 1;
//   k = row + 1;
//   while (k < 6 && z >= 0) {
//     linksUnten.push(spielfeld[k][z]);
//     k++;
//     z--;
//   }
//   gesReihe = rechtsOben.reverse().concat(linksUnten);
//   return gewinntVier(gesReihe);
// }

// function gewinntVier(testArr) {
//   const arrText = testArr.join("");
//   const result = arrText.search("RRRR") !== -1 || arrText.search("GGGG") !== -1;
//   if (result) {
//     console.log(result);
//     console.log(arrText);
//   }

//   return result;
// }

// function getSlotPlace(col) {
//   return 0;
// }
