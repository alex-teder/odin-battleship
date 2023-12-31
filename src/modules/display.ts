import { Player } from "./game";

const section1: HTMLElement = document.querySelector("#section1")!;
const section2: HTMLElement = document.querySelector("#section2")!;
let board1: HTMLElement = section1.querySelector(".player-board")!;
let board2: HTMLElement = section2.querySelector(".player-board")!;
const textParagraph: HTMLElement = document.querySelector(".text-field > p")!;

const messages = [
  "Place your ships. Press <b>right mouse button</b> to rotate the ship...",
  "Make your move!",
  "Waiting for opponent to shoot...",
  "Hit! Make your next move...",
  "Ship destroyed! Make your next move...",
  "YOU WON! Reload the page to play again.",
  "YOU LOST! Reload the page to play again.",
];

export function displayMessage(i: number) {
  textParagraph.innerHTML = messages[i];
}

export function updateBoardReference() {
  board1 = section1.querySelector(".player-board")!;
  board2 = section2.querySelector(".player-board")!;
}

export function init() {
  const gridSize = 10;
  board1.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  board1.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  board2.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  board2.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board1.appendChild(cell);
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "cell--hidden");

      board2.appendChild(cell);
    }
  }
}

export function refreshBoard1(player: Player) {
  const grid = player.gameboard.grid;
  const htmlCells = board1.querySelectorAll(".cell");
  for (const cell of grid.cells) {
    if (cell.isHit && cell.ship !== null) {
      htmlCells[grid.cells.indexOf(cell)].classList.add("cell--hit-ship");
    } else if (cell.isHit) {
      htmlCells[grid.cells.indexOf(cell)].classList.add("cell--hit");
    } else if (cell.ship !== null) {
      htmlCells[grid.cells.indexOf(cell)].classList.add("cell--ship-part");
    }
  }
  section1.querySelector(".player-ships")!.innerHTML = "";
  const ships = getShipsHTML(player);
  for (const ship of ships) {
    section1.querySelector(".player-ships")!.append(ship);
  }
}

export function refreshBoard2(player: Player) {
  const grid = player.gameboard.grid;
  const htmlCells = board2.querySelectorAll(".cell");
  for (const cell of grid.cells) {
    if (cell.isHit && cell.ship !== null) {
      htmlCells[grid.cells.indexOf(cell)].classList.remove("cell--hidden");
      htmlCells[grid.cells.indexOf(cell)].classList.add("cell--hit-ship");
    } else if (cell.isHit) {
      htmlCells[grid.cells.indexOf(cell)].classList.remove("cell--hidden");
      htmlCells[grid.cells.indexOf(cell)].classList.add("cell--hit");
    }
  }
  section2.querySelector(".player-ships")!.innerHTML = "";
  const ships = getShipsHTML(player);
  for (const ship of ships) {
    section2.querySelector(".player-ships")!.append(ship);
  }
}

function getShipsHTML(player: Player) {
  const result: Array<HTMLDivElement> = [];
  for (const ship of player.ships) {
    const htmlShip = document.createElement("div");
    htmlShip.classList.add("small-ship");
    for (let i = 0; i < ship.size; i++) {
      const htmlShipPart = document.createElement("div");
      htmlShipPart.classList.add("small-cell");
      if (!ship.isAlive) {
        htmlShipPart.classList.add("small-cell--dead");
      }
      htmlShip.append(htmlShipPart);
    }
    result.push(htmlShip);
  }
  return result;
}
