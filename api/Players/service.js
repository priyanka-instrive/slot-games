const Player = require("./index");

async function createPlayerInDB(playerData) {
  try {
    const newPlayer = await Player.create(playerData);
    return newPlayer;
  } catch (error) {
    throw new Error("Error creating player: " + error.message);
  }
}

async function findPlayerById(playerId) {
  try {
    const player = await Player.findById(playerId);
    return player;
  } catch (error) {
    throw new Error("Error finding player: " + error.message);
  }
}

async function updatePlayerBalance(playerId, betAmount, winnings) {
  try {
    const netChange = winnings > 0 ? winnings : -betAmount;

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { $inc: { balance: netChange } },
      { new: true }
    );

    return updatedPlayer;
  } catch (error) {
    throw new Error("Error updating player balance: " + error.message);
  }
}

module.exports = {
  createPlayerInDB,
  findPlayerById,
  updatePlayerBalance,
};
