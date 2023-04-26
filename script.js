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
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
    ["A3", "B2", "C1"],
    ["A1", "B2", "C3"],
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
const possibleMoves = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const samplePersonMove = [];
const AIMove = [];

document.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", (e) => {
    // Make the button not clickable in the future
    e.target.disabled = true;
    samplePersonMove.push(e.target.value);
    e.target.innerText = "X";
    findWinner(samplePersonMove, AIMove);

    const index = possibleMoves.indexOf(e.target.value);
    possibleMoves.splice(index, 1);

    if (!personOneWinner && !aiWinner) {
      setTimeout(() => {
        if (possibleMoves.length) {
          const numberOfPossibleMoves = possibleMoves.length;
          const ran = Math.floor(Math.random() * numberOfPossibleMoves);
          //   console.log(possibleMoves[ran]);
          const aiMove = possibleMoves[ran];

          AIMove.push(aiMove);
          findWinner(samplePersonMove, AIMove);
          possibleMoves.splice(ran, 1);
          document.querySelector(`button[value="${aiMove}"]`).innerText = "O";
          document.querySelector(`button[value="${aiMove}"]`).disabled = true;
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
