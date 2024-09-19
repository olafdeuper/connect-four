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
// flags für volle slots
let fl_s0 = false;
let fl_s1 = false;
let fl_s2 = false;
let fl_s3 = false;
let fl_s4 = false;
let fl_s5 = false;
let fl_s6 = false;
// Initialisierung des Spielfeld Arrays
let spielfeld = new Array(maxRows);
//Initialisierung des 1. Spielers
let spieler = "Spieler-1";
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
      // String N steht für leeres Feld
      spielfeld[rows][cols] = "N";
    }
  }

  // Flags für volle Slots zurücksetzen
  fl_s0 = false;
  fl_s1 = false;
  fl_s2 = false;
  fl_s3 = false;
  fl_s4 = false;
  fl_s5 = false;
  fl_s6 = false;

  // Neues Spiel Button unsichtbar machen und
  // Click Funktionalität entfernen
  neuesSpiel.children[0].style.opacity = 0;
  neuesSpiel.onclick = "";
  // Gelb fängt an
  h1spieler.innerHTML = "Gelb ist am Zug:";
  //Spielfeld aufgrund der Einträge im Array aktualisiern
  mapArray();
};

// Startet das Spiel neu
function funcNewGame() {
  window.location.reload();
}

// mapArray überträgt die Einträge Y, R oder N auf das css Spielfeld
// und setzt rote, gelbe oder keine Chips an die richtige Stelle
const mapArray = function () {
  // speichert den String an der aktuellen Position im Array
  let field;
  // enthält die Klasse, die die korrekten Farben für die Darstellung
  // des Chips bzw. des leeren Feldes enthält
  let strClass;
  // enthält die id mit dem das korrespondierende Feld in css angesprochen
  // wird.
  let strColRow;
  // enthält das Feld als html Element, das mittels der id ermittelt wird
  let actField;

  // loop durchläuf die Reihen des Array
  for (let rows = 0; rows < maxRows; rows++) {
    // loop durchläuft die Spalten des Array
    for (let cols = 0; cols < maxCols; cols++) {
      // char im aktuellen Feld ermitteln R,N,Y
      field = spielfeld[rows][cols];
      // Klassen String Variable zurücksetzen
      strClass = "";
      // String der korrespodierenden Id zusammensetzen
      strColRow = rows.toString() + cols.toString();
      // korrekte Klasse aufgrund des im Array eingetragenen Strings auswählen
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
      // Das korrespondierende Element im Html/css ermitteln
      actField = document.getElementById(strColRow);
      // aus der Initialisierung vorhandene Klasse des
      // leeren Feldes entferenen
      actField.classList.remove("chip-black");
      // Neue Klasse zuweisen Y = chip-yellow, R = chip-red
      actField.classList.add(strClass);
    }
  }
};

// Wie bei dem realen Spiel sollen die Spalten von unten nach
// oben aufgefüllt werden. calcRow sorgt dafür
const calcRow = function (col, colClass) {
  // Nimmt den Wert der letzten freien Reihe im Slot auf
  let lastFreeRow = 0;
  // loop durchläuft den angeklickten Spaltenvektor
  // und ermittelt die letzte freie Zelle von oben
  while (lastFreeRow < maxRows) {
    // Ein bereits belegtes Feld enthält nicht den char N
    if (spielfeld[lastFreeRow][col] !== "N") {
      // Wenn der Slot voll ist deaktiviere den insert Chip button
      if (lastFreeRow === 1) {
        colClass.onclick = "";
        // Wenn ein Slot voll ist, setze das jeweilige Flag auf true
        switch (colClass.id) {
          case "slot-0":
            fl_s0 = true;
            console.log("fl_s0 = true");
            break;
          case "slot-1":
            fl_s1 = true;
            console.log("fl_s1 = true");
            break;
          case "slot-2":
            fl_s2 = true;
            console.log("fl_s2 = true");
            break;
          case "slot-3":
            fl_s3 = true;
            console.log("fl_s3 = true");
            break;
          case "slot-4":
            fl_s4 = true;
            console.log("fl_s4 = true");
            break;
          case "slot-5":
            fl_s5 = true;
            console.log("fl_s5 = true");
            break;
          case "slot-6":
            console.log("fl_s6 = true");
            fl_s6 = true;
            break;
        }
      }
      // da zero-based, muss der ermittelte Reihenwert um 1 vermindert werden
      return lastFreeRow - 1;
    }
    lastFreeRow++;
  }
  // Default Wert, falls alle Felder frei sind
  return maxRows - 1;
};

// Hilfsfunktion die true zurückgibt wenn alle slots voll sind
const allSlotsFilled = function () {
  if (
    fl_s0 === true &&
    fl_s1 === true &&
    fl_s2 === true &&
    fl_s3 === true &&
    fl_s4 === true &&
    fl_s5 === true
  ) {
    return true;
  }
  return false;
};

// Hilfsfunktion, die alle Slots ausser Funktion setzt sobald es
// einen Gewinner gibt
const disableSlots = function () {
  for (let i = 0; i < maxCols; i++) {
    // slots von slot-0 bis slot-6 deaktivieren
    playGround[0].children[i].children[0].onclick = "";
  }
};

// Ermittelt den Gewinner und gibt ihn als string zurück
const isWinner = function (player, row, col) {
  return "Rot gewinnt!";
};

// Hauptfunktion des Spiels, wertet die Mausclicks auf dem Spielbrett aus
function ClickFunction(item) {
  // Enthält die Reihe des zuletzt gesetzen Chips
  let actRow;
  let winner;
  // actCol nimmt den Wert der Spalte des angeklickten insert chip Feldes auf
  // Spalte aus dem letzen Buchstaben des Klassenstrings ermitteln
  let actCol = item.target.id.slice(-1) * 1;
  // Nur das parent-Element soll seine Klasse zurückgeben
  if (item.target !== item.currentTarget) return;
  //spielfeld[calcRow(col, item.target)][col] = "Y";
  if (spieler === "Spieler-1") {
    h1spieler.innerHTML = "Rot ist am Zug:";
    spieler = "Spieler-2";
    actRow = calcRow(actCol, item.target);
    spielfeld[actRow][actCol] = "Y";
    winner = isWinner(spieler, actRow, actCol);
    mapArray();

    //     gibtGewinner = isGewinner(1, row, col);
  } else {
    h1spieler.innerHTML = "Gelb ist am Zug:";
    spieler = "Spieler-1";
    actRow = calcRow(actCol, item.target);
    spielfeld[actRow][actCol] = "R";
    winner = isWinner(spieler, actRow, actCol);
    mapArray();

    //     gibtGewinner = isGewinner(-1, row, col);
  }

  // Wenn alle slots gefüllt sind und es bis dahin keinen
  // Gewinner gab, ist es unentschieden
  if (allSlotsFilled() === true) {
    h1spieler.innerHTML = "Unentschieden!";
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
    console.log(spielfeld);
  }

  if (winner === "Gelb gewinnt!") {
    h1spieler.innerHTML = winner;
    disableSlots();
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
  }

  if (winner === "Rot gewinnt!") {
    h1spieler.innerHTML = winner;
    disableSlots();
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
  }
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
