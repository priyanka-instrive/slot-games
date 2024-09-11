const { Schema, default: mongoose } = require("mongoose");
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 1000, // Initial balance for new players
    required: true,
  },
});

const Player = mongoose.model("Player", playerSchema, "Players");

module.exports = Player;
