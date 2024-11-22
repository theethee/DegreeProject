const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query("DELETE FROM posts WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "blog post not found" });
    }

    res.json({ message: "Blogginlägget är nu raderat" });
    
  } catch (error) {
    console.error("Error gick inte att radera blogginlägget", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
