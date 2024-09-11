const slotMachineService = require("./service");

exports.spinReels = async (req, res) => {
  try {
    const { playerId, betAmount } = req.body;

    if (!playerId) {
      return res.status(400).json({ error: "Player ID is required" });
    }

    if (!betAmount || betAmount <= 0) {
      return res.status(400).json({ error: "Invalid bet amount" });
    }

    const result = await slotMachineService.processSpin(playerId, betAmount);

    return res.status(200).json({
      message: "Slot machine spun successfully",
      symbols: result.symbols,
      outcome: result.outcome,
      betAmount: result.betAmount,
      winnings: result.winnings,
      balance: result.balance,
    });
  } catch (error) {
    console.error("Error spinning the reels:", error);
    return res.status(500).json({ error: error.message });
  }
};
