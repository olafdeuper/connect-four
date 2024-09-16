"use strict";

const clBox = document.getElementsByClassName("box");
const tableRows = document.getElementsByClassName("gameRow");
const tableCols = document.getElementsByClassName("gameCol");
const tableImgs = document.getElementsByClassName("boxImg");
const h1spieler = document.querySelector("#welcherSpieler>h1");
const neuesSpiel = document.getElementById("neuesSpiel");
let spielfeld = new Array(6);
let spieler = "Spieler-1";
let anzClicks = 0;
let gibtGewinner = "";

const clBoxSize = () => {
  for (let i = 0; i < clBox.length; i++) {
    const clBoxStyles = window.getComputedStyle(clBox[i]);
    clBox[i].style.height = clBoxStyles.getPropertyValue("width");
  }
};

window.onload = () => {
  for (let i = 0; i < spielfeld.length; i++) {
    spielfeld[i] = new Array(7);
  }

  for (let i = 0; i < 6; i++) {
    let strI = "row-" + i.toString();
    tableRows[i].id = strI;
    for (let j = 0; j < 7; j++) {
      let strJ = "col-" + j.toString();
      tableRows[i].children[j].id = strJ;
      let strIJ = j.toString() + i.toString();
      tableRows[i].children[j].children[0].children[0].id = strIJ;
      tableRows[i].children[j].children[0].children[0].onclick = ClickFunction;
      spielfeld[i][j] = "";
    }
  }

  h1spieler.innerHTML = "Grün ist am Zug:";
  anzClicks = 0;
  clBoxSize();
};

window.onresize = () => {
  clBoxSize();
};

function ClickFunction(ding) {
  let col = (ding.target.id - (ding.target.id % 10)) / 10;
  let row = ding.target.id % 10;
  let newRow;
  anzClicks++;

  if (spieler === "Spieler-1") {
    ding.target.src = "./media/GreenChip100x100.png";
    h1spieler.innerHTML = "Rot ist am Zug:";
    spieler = "Spieler-2";
    newRow = getSlotPlace(col);
    spielfeld[newRow][col] = "G";
    gibtGewinner = isGewinner(1, row, col);
  } else {
    ding.target.src = "./media/RedChip100x100.png";
    h1spieler.innerHTML = "Grün ist am Zug:";
    spieler = "Spieler-1";
    newRow = getSlotPlace(col);
    spielfeld[newRow][col] = "R";
    gibtGewinner = isGewinner(-1, row, col);
  }

  ding.target.onclick = "";

  if (anzClicks === 42) {
    h1spieler.innerHTML = "Unentschieden!";
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
    console.log(spielfeld);
  }
  if (gibtGewinner === "Grün gewinnt!") {
    h1spieler.innerHTML = gibtGewinner;
    killOnclick();
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
  }

  if (gibtGewinner === "Rot gewinnt!") {
    h1spieler.innerHTML = gibtGewinner;
    killOnclick();
    neuesSpiel.children[0].style.opacity = 1;
    neuesSpiel.onclick = funcNewGame;
  }
}

function funcNewGame() {
  window.location.reload();
}

function isGewinner(nrspieler, row, col) {
  let result = "";
  if (
    sucheSpalte(row, col) ||
    sucheReihe(row, col) ||
    sucheDiagLinks(row, col) ||
    sucheDiagRechts(row, col)
  ) {
    if (nrspieler === 1) {
      result = "Grün gewinnt!";
    } else {
      result = "Rot gewinnt!";
    }
  }
  return result;
}

function killOnclick() {
  for (let i = 0; i < 42; i++) {
    tableImgs[i].onclick = "";
  }
}

function sucheSpalte(row, col) {
  let z = row;
  let k = row + 1;
  const oben = [];
  const unten = [];
  let gesSpalte = [];
  while (z >= 0) {
    oben.push(spielfeld[z][col]);
    z--;
  }
  while (k < 6) {
    unten.push(spielfeld[k][col]);
    k++;
  }
  gesSpalte = unten.reverse().concat(oben);
  return gewinntVier(gesSpalte);
}

function sucheReihe(row, col) {
  let z = col;
  let k = col + 1;
  const links = [];
  const rechts = [];
  let gesReihe = [];
  while (z >= 0) {
    links.push(spielfeld[row][z]);
    z--;
  }
  while (k < 7) {
    rechts.push(spielfeld[row][k]);
    k++;
  }
  gesReihe = links.reverse().concat(rechts);
  return gewinntVier(gesReihe);
}

function sucheDiagLinks(row, col) {
  let z = col;
  let k = row;
  const linksOben = [];
  const rechtsUnten = [];
  let gesReihe = [];
  while (k >= 0 && z >= 0) {
    linksOben.push(spielfeld[k][z]);
    k--;
    z--;
  }
  z = col + 1;
  k = row + 1;
  while (k < 6 && z < 7) {
    rechtsUnten.push(spielfeld[k][z]);
    k++;
    z++;
  }
  gesReihe = linksOben.reverse().concat(rechtsUnten);
  return gewinntVier(gesReihe);
}

function sucheDiagRechts(row, col) {
  let z = col;
  let k = row;
  const rechtsOben = [];
  const linksUnten = [];
  let gesReihe = [];
  while (k >= 0 && z < 7) {
    rechtsOben.push(spielfeld[k][z]);
    k--;
    z++;
  }
  z = col - 1;
  k = row + 1;
  while (k < 6 && z >= 0) {
    linksUnten.push(spielfeld[k][z]);
    k++;
    z--;
  }
  gesReihe = rechtsOben.reverse().concat(linksUnten);
  return gewinntVier(gesReihe);
}

function gewinntVier(testArr) {
  const arrText = testArr.join("");
  const result = arrText.search("RRRR") !== -1 || arrText.search("GGGG") !== -1;
  if (result) {
    console.log(result);
    console.log(arrText);
  }

  return result;
}

function getSlotPlace(col) {
  return 0;
}
