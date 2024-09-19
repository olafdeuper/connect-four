"use strict";

//css gameFielder einlesen
const playGround = document.getElementsByClassName("play-ground");
//css Spieler Anzeige
const h1spieler = document.querySelector("#welcherSpieler>h1");
// css neues Spiel button
const neuesSpiel = document.getElementById("neuesSpiel");
// Maße des gameFields in Feldern festlegen:
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
// Initialisierung des gameField Arrays
let gameField = new Array(maxRows);
//Initialisierung des 1. Spielers
let spieler = "Spieler-2";
//Variable speichert den Sieger
let gibtGewinner = "";

// Das Css gameField wurde geladen
window.onload = () => {
  // 2.Dimension des gameFieldes
  for (let i = 0; i < gameField.length; i++) {
    gameField[i] = new Array(maxCols);
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
  //Alle gameFielder leeren und als schwarze Löcher darstellen
  //Äußere Schleife durchläuft alle Zeilen
  for (let rows = 0; rows < maxRows; rows++) {
    //Innere Schleife durchläuft alle Spalten
    for (let cols = 0; cols < maxCols; cols++) {
      // String N steht für leeres Feld
      gameField[rows][cols] = "N";
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
  h1spieler.innerHTML = "Rot ist am Zug:";
  //gameField aufgrund der Einträge im Array aktualisiern
  mapArray();
};

// Startet das Spiel neu
function funcNewGame() {
  window.location.reload();
}

// mapArray überträgt die Einträge Y, R oder N auf das css gameField
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
      field = gameField[rows][cols];
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
    if (gameField[lastFreeRow][col] !== "N") {
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
// Kopiert eine Diagonale an der Position
// des aktuell gesetzen Chips in einen Vektor
function searchDiagRight(row, col) {
  let z = col;
  let k = row;
  const rightAbove = [];
  const leftBelow = [];
  let compRow = [];
  // Diagonale rechts oben ab der aktuellen Position kopieren,
  // inklusive der aktuellen Position
  while (k >= 0 && z < 7) {
    rightAbove.push(gameField[k][z]);
    k--;
    z++;
  }
  z = col - 1;
  k = row + 1;
  // Diagonale links unterhalb der aktuellen Position kopieren
  while (k < 6 && z >= 0) {
    leftBelow.push(gameField[k][z]);
    k++;
    z--;
  }
  // die Werte in dem oberen Vektor umdrehen und mit dem unteren verbinden
  compRow = rightAbove.reverse().concat(leftBelow);
  // Auf vier gleiche Buchstaben nebeneinander testen
  return winsFour(compRow);
}

// Kopiert eine Diagonale an der Position
// des aktuell gesetzen Chips in einen Vektor
function searchDiagLeft(row, col) {
  let z = col;
  let k = row;
  const leftAbove = [];
  const rightBelow = [];
  let gesReihe = [];
  // Diagonale links oben ab der aktuellen Position kopieren,
  // inklusive der aktuellen Position
  while (k >= 0 && z >= 0) {
    leftAbove.push(gameField[k][z]);
    k--;
    z--;
  }
  z = col + 1;
  k = row + 1;
  // Diagonale rechts unterhalb der aktuellen Position kopieren
  while (k < 6 && z < 7) {
    rightBelow.push(gameField[k][z]);
    k++;
    z++;
  }
  // die Werte in dem oberen Vektor umdrehen und mit dem unteren verbinden
  gesReihe = leftAbove.reverse().concat(rightBelow);
  // Auf vier gleiche Buchstaben nebeneinander testen
  return winsFour(gesReihe);
}

// Kopiert die Reihe an der Position
// des aktuell gesetzen Chips in einen Vektor
function searchRow(row, col) {
  let z = col;
  let k = col + 1;
  const left = [];
  const right = [];
  let compRow = [];
  // linke Reihe ab der aktuellen Position kopieren,
  // inklusive der aktuellen Position
  while (z >= 0) {
    left.push(gameField[row][z]);
    z--;
  }
  // Reihe rechts der aktuellen Position kopieren
  while (k < 7) {
    right.push(gameField[row][k]);
    k++;
  }
  // die Werte im linken Vektor umdrehen und mit dem rechten verbinden
  compRow = left.reverse().concat(right);
  // Auf vier gleiche Buchstaben nebeneinander testen
  return winsFour(compRow);
}

// Kopiert die Spalte an der Position
// des aktuell gesetzen Chips in einen Vektor
function searchCol(row, col) {
  let z = row;
  let k = row + 1;
  const above = [];
  const below = [];
  let compCol = [];
  //Spalte oberhalb der aktuellen Position kopieren inklusive der aktuellen Position
  while (z >= 0) {
    above.push(gameField[z][col]);
    z--;
  }
  //Spalte unterhalb der aktuellen Position kopieren
  while (k < 6) {
    below.push(gameField[k][col]);
    k++;
  }
  console.log(below);
  // die Werte im unteren Vektor umdrehen und mit dem oberen verbinden
  compCol = below.reverse().concat(above);
  // Auf vier gleiche Buchstaben nebeneinander testen
  return winsFour(compCol);
}

//Testet ob sich vier gleichfarbige Chips nebeneinander befinden
function winsFour(testArr) {
  console.log(testArr);
  //Spaltenvektor in einen String ohne Zwischenräume wandeln
  const arrText = testArr.join("");
  //Test ob sich vier Rs oder vier Ys nebeneinander in dem String befinden
  //falls ja, true zurückgeben
  const result = arrText.search("RRRR") !== -1 || arrText.search("YYYY") !== -1;
  return result;
}

// Ermittelt den Gewinner und gibt ihn als string zurück
const isWinner = function (player, row, col) {
  console.log(player);
  let result = "";
  // Vertikale, horizontale und diagonale Achsen auf vier gleiche
  // Zeichen (R oder Y) üperprüfen
  if (
    searchCol(row, col) === true ||
    searchRow(row, col) === true ||
    searchDiagLeft(row, col) === true ||
    searchDiagRight(row, col)
  ) {
    // Wenn in einer der Achsen vier gleiche Zeichen gefunden wurden
    // Gewinner zurückgeben
    if (player === "Spieler-1") {
      result = "Rot gewinnt!";
    } else {
      result = "Gelb gewinnt!";
    }
  }
  return result;
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

  //Spieler werden mit jedem Einfurf eines Chips gewechselt
  // also mit jedem neuen Aufruf der ClickFunKtion
  // wenn Spieler-1 (R) dran war wechselt es zu Spieler-2 (Y)
  if (spieler === "Spieler-1") {
    //Anzeige wechseln bevor der nächste Spieler dran ist
    h1spieler.innerHTML = "Rot ist am Zug:";
    //Spieler-2 ist dran
    spieler = "Spieler-2";
    //Aus der angeklickten Spalte die Reihe berechnen,
    // das letzte freie Feld von oben gesehen
    actRow = calcRow(actCol, item.target);
    // im Spielfeld Array das gespielte Feld mit
    // der korrekten Markierung (Y) versehen
    gameField[actRow][actCol] = "Y";
    // nach dem Zug, das Array aktualisieren
    mapArray();
    //Überprüfen ob der Zug zum Sieg führte
    winner = isWinner(spieler, actRow, actCol);
  } else {
    //Anzeige wechseln bevor der nächste Spieler dran ist
    h1spieler.innerHTML = "Gelb ist am Zug:";
    //Spieler-1 ist dran
    spieler = "Spieler-1";
    //Aus der angeklickten Spalte die Reihe berechnen,
    // das letzte freie Feld von oben gesehen
    actRow = calcRow(actCol, item.target);
    // im Spielfeld Array das gespielte Feld mit
    // der korrekten Markierung (R) versehen
    gameField[actRow][actCol] = "R";
    // nach dem Zug, das Array aktualisieren
    mapArray();
    //Überprüfen ob der Zug zum Sieg führte
    winner = isWinner(spieler, actRow, actCol);
  }

  // Wenn alle slots gefüllt sind und es bis dahin keinen
  // Gewinner gab, ist es unentschieden
  if (allSlotsFilled() === true) {
    h1spieler.innerHTML = "Unentschieden!";
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
    console.log(gameField);
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

// function searchDiagLeft(row, col) {
//   let z = col;
//   let k = row;
//   const leftOben = [];
//   const rightUnten = [];
//   let gesReihe = [];
//   while (k >= 0 && z >= 0) {
//     leftOben.push(gameField[k][z]);
//     k--;
//     z--;
//   }
//   z = col + 1;
//   k = row + 1;
//   while (k < 6 && z < 7) {
//     rrightUnten.push(gameField[k][z]);
//     k++;
//     z++;
//   }
//   gesReihe = linksOben.reverse().concat(rechtsUnten);
//   return gewinntVier(gesReihe);
// }

// function sucheDiagRight(row, col) {
//   let z = col;
//   let k = row;
//   const rightOben = [];
//   const leftUnten = [];
//   let gesReihe = [];
//   while (k >= 0 && z < 7) {
//     rightOben.push(gameField[k][z]);
//     k--;
//     z++;
//   }
//   z = col - 1;
//   k = row + 1;
//   while (k < 6 && z >= 0) {
//     leftUnten.push(gameField[k][z]);
//     k++;
//     z--;
//   }
//   gesReihe = rightOben.reverse().concat(leftUnten);
//   return gewinntVier(gesReihe);
// }

//function getSlotPlace(col) {
//return 0;
//}
