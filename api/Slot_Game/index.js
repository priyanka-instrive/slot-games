const { Schema, default: mongoose } = require("mongoose");
const slotMachineResultSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", // Reference to the Player model
    required: true,
  },
  symbols: {
    type: [String],
    required: true,
  },
  outcome: {
    type: String,
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
  winnings: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SlotMachineResult = mongoose.model(
  "SlotMachineResult",
  slotMachineResultSchema,
  "SlotMachineResults"
);

module.exports = SlotMachineResult;
