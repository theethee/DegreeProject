const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get("/posts", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM posts`);
    console.log("Hämtar alla blogginlägg");

    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching all posts", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
