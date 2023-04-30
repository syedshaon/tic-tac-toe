import "./style.scss";
import Minimax from "tic-tac-toe-minimax";

const person = (name) => {
  const allMoves = [];

  const storeMove = (x) => allMoves.push(x);
  return { name, storeMove, allMoves };
};

// Player Name Entry
let person1;
if (localStorage.getItem("playerName")) {
  document.getElementById("container").style.display = "grid";
  document.getElementById("name-area").style.display = "none";
  document.getElementById("control-panel").style.display = "block";

  document.getElementById("playerName").innerText = `${localStorage.getItem(
    "playerName"
  )} (X)`;

  person1 = person(localStorage.getItem("playerName"));
}

document.getElementById("nameSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("name").value;
  //   console.log(playerName);
  person1 = person(playerName);
  localStorage.setItem("playerName", playerName);

  if (person1.name) {
    document.getElementById("playerName").innerText = `${person1.name} (X)`;
    document.getElementById("container").style.display = "grid";
    document.getElementById("name-area").style.display = "none";
    document.getElementById("control-panel").style.display = "block";
  }
});

// Winner counter and storing to local storage
let personOneWinner = false;
let numberPlayerWon;
if (localStorage.getItem("numberPlayerWon")) {
  numberPlayerWon = localStorage.getItem("numberPlayerWon");
} else {
  numberPlayerWon = 0;
}

let aiWinner = false;
let numberAiWon;
if (localStorage.getItem("numberAiWon")) {
  numberAiWon = localStorage.getItem("numberAiWon");
} else {
  numberAiWon = 0;
}

let numberOfDraw;
if (localStorage.getItem("numberOfDraw")) {
  numberOfDraw = localStorage.getItem("numberOfDraw");
} else {
  numberOfDraw = 0;
}

// Show Results in DOM
function showResultsInDom() {
  document.getElementById("pOwn").innerText = numberPlayerWon;
  document.getElementById("nDraw").innerText = numberOfDraw;
  document.getElementById("AIOwn").innerText = numberAiWon;
}
showResultsInDom();

// Logic to find the winner
const findWinner = (p1Moves, aiMoves) => {
  const winingComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  winingComb.forEach((comb) => {
    if (!personOneWinner && !aiWinner) {
      // Check Person 1 entries
      personOneWinner = comb.every((element) => {
        return p1Moves.includes(element);
      });
      if (personOneWinner) {
        document.getElementById(
          "winner"
        ).innerText = `${person1.name} is the Winner this time! 🎈`;
        // console.log("p1 winner");
        numberPlayerWon++;
        localStorage.setItem("numberPlayerWon", numberPlayerWon);
        document.getElementById("reload").style.display = "block";
      }
    }

    if (!personOneWinner && !aiWinner) {
      // Check Person 2 entries
      aiWinner = comb.every((element) => {
        return aiMoves.includes(element);
      });
      if (aiWinner) {
        // console.log("p2 winner");
        numberAiWon++;
        localStorage.setItem("numberAiWon", numberAiWon);
        document.getElementById("winner").innerText =
          "AI is the Winner this time! 🎈";
        document.getElementById("reload").style.display = "block";
      }
    }
  });

  if (p1Moves.length + aiMoves.length === 9 && !personOneWinner && !aiWinner) {
    // console.log("Draw");
    document.getElementById("winner").innerText = `It was a draw :(`;
    document.getElementById("reload").style.display = "block";

    numberOfDraw++;
    localStorage.setItem("numberOfDraw", numberOfDraw);
  }
};

// findWinner(samplePersonMove, AIMove);

// Dom Control
// const possibleMoves = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const possibleMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//  const board = [0, 1, aiPlayer, 3, huPlayer, huPlayer, 6, 7, 8];
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const { ComputerMove } = Minimax;

const huPlayer = "X";
const aiPlayer = "O";
const symbols = {
  huPlayer: huPlayer,
  aiPlayer: aiPlayer,
};

const samplePersonMove = [];
const AIMove = [];

document.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", (e) => {
    // Make the button not clickable in the future
    // console.log(e.target.dataset.key);
    e.target.disabled = true;
    samplePersonMove.push(parseInt(e.target.value));

    board[parseInt(e.target.value)] = symbols.huPlayer;

    e.target.innerText = "X";
    findWinner(samplePersonMove, AIMove);

    const index = possibleMoves.indexOf(parseInt(e.target.value));
    possibleMoves.splice(index, 1);

    console.log(board);
    // if (!personOneWinner && !aiWinner) {
    //   setTimeout(() => {
    //     if (possibleMoves.length) {
    //       const numberOfPossibleMoves = possibleMoves.length;
    //       const ran = Math.floor(Math.random() * numberOfPossibleMoves);
    //       //   console.log(possibleMoves[ran]);
    //       const aiMove = possibleMoves[ran];

    //       AIMove.push(aiMove);
    //       findWinner(samplePersonMove, AIMove);
    //       possibleMoves.splice(ran, 1);
    //       document.querySelector(`button[value="${aiMove}"]`).innerText = "O";
    //       document.querySelector(`button[value="${aiMove}"]`).disabled = true;
    //     }
    //   }, 400);
    // }

    if (!personOneWinner && !aiWinner) {
      setTimeout(() => {
        if (possibleMoves.length) {
          // Implementing minmax logarithm

          const difficulty = "Hard";

          const nextMove = ComputerMove(board, symbols, difficulty);
          board[nextMove] = symbols.aiPlayer;
          console.log(nextMove);

          //const aiMove = board[nextMove];

          AIMove.push(nextMove);
          findWinner(samplePersonMove, AIMove);
          // const indexOfNextMove = possibleMoves.findIndex(nextMove);

          // possibleMoves.splice(indexOfNextMove, 1);

          const index = possibleMoves.indexOf(nextMove);
          possibleMoves.splice(index, 1);

          document.querySelector(`button[value="${nextMove}"]`).innerText = "O";
          document.querySelector(`button[value="${nextMove}"]`).disabled = true;
          console.log(board);
        }
      }, 400);
    }

    setTimeout(() => {
      console.log(samplePersonMove);
      console.log(AIMove);
      console.log(possibleMoves);

      showResultsInDom();
      if (personOneWinner === true || aiWinner === true) {
        console.log("got winner");
        document.querySelectorAll("button").forEach((bt) => {
          bt.disabled = true;
        });
      }
    }, 405);
  });
});

// Reload the page when the reload button is clicked

document.getElementById("reload").addEventListener("click", () => {
  location.reload();
});

// Min Max Algorithm
// Will do in version 2
