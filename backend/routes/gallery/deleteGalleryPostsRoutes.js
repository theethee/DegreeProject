const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.delete("/galleryposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM galleryposts WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "gallery post not found" });
    }

    res.json({ message: "Galleri-inlägget är nu raderat" });
  } catch (error) {
    console.error("Error gick inte att radera galleri-inlägget", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
