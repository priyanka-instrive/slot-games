const SlotMachineResult = require("./index");
const playerService = require("../Players/service");

function spinReels() {
  const reels = [
    ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Star", "Seven"],
    ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Star", "Seven"],
    ["Cherry", "Lemon", "Orange", "Plum", "Bell", "Star", "Seven"],
  ];

  const symbols = reels.map((reel) => {
    const randomIndex = Math.floor(Math.random() * reel.length);
    return reel[randomIndex];
  });

  const outcome = checkWin(symbols);
  return { symbols, outcome };
}

// Check if the symbols match a payline (game logic)
function checkWin(symbols) {
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    return `You won with a combination of ${symbols[0]}!`;
  }
  return "You lost! Better luck next time.";
}

async function saveResult(result) {
  try {
    const newResult = await SlotMachineResult.create({
      playerId: result.playerId,
      symbols: result.symbols,
      outcome: result.outcome,
      betAmount: result.betAmount,
      winnings: result.winnings,
      date: result.date || new Date(),
    });
    return newResult;
  } catch (error) {
    console.error("Error saving result to MongoDB:", error);
    throw new Error("Failed to save the result.");
  }
}

async function processSpin(playerId, betAmount) {
  const result = spinReels();

  let winnings = 0;
  if (result.outcome.includes("won")) {
    winnings = betAmount * 2;
  }

  const updatedPlayer = await playerService.updatePlayerBalance(
    playerId,
    betAmount,
    winnings
  );

  await saveResult({
    symbols: result.symbols,
    outcome: result.outcome,
    betAmount,
    winnings,
    playerId,
  });

  return {
    symbols: result.symbols,
    outcome: result.outcome,
    betAmount,
    winnings,
    balance: updatedPlayer.balance,
  };
}

module.exports = {
  spinReels,
  processSpin,
  saveResult,
};
