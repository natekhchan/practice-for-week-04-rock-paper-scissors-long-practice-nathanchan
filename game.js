const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: 'Rock',
  p: 'Paper',
  s: 'Scissors'
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;
let cpuMoves = ['r', 's', 'p'];

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  Object.keys(VALID_MOVES).forEach(move => {
    console.log(`  Type '${move}' for ${VALID_MOVES[move]}`);
  });
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

function getWinner(move1, move2) {
  if (move1 === move2) {
    return 0; // Tie
  }
  if (
    (move1 === 'r' && move2 === 's') ||
    (move1 === 's' && move2 === 'p') ||
    (move1 === 'p' && move2 === 'r')
  ) {
    return 1; // move1 wins
  }
  return -1; // move2 wins
}

function getCPUMove() {
  if (cpuMoves.length === 0) {
    cpuMoves = ['r', 's', 'p'];
  }
  const randomIndex = Math.floor(Math.random() * cpuMoves.length);
  return cpuMoves.splice(randomIndex, 1)[0];
}

function processMove(cmd, cpu) {
  console.log(`You pick ${VALID_MOVES[cmd]}, computer picks ${VALID_MOVES[cpu]}.`);
  const winner = getWinner(cmd, cpu);

  if (winner === 0) {
    console.log("You tie.\n");
    ties++;
  } else if (winner === 1) {
    console.log("You win!\n");
    wins++;
  } else {
    console.log("You lose...\n");
    losses++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', cmd => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const cpu = getCPUMove();
      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }

    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
