const playerService = require("./service");

exports.createPlayer = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Player name is required" });
    }

    const newPlayer = await playerService.createPlayerInDB({ name });

    return res.status(201).json({
      message: "Player created successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.error("Error creating player:", error);
    return res.status(500).json({ error: error.message });
  }
};
