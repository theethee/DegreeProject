const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get("/galleryposts", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM galleryposts`);
    console.log("Hämtar alla inlägg från galleri");

    res.json(rows);
  } catch (error) {
    console.error("Something went wrong fetching all gallery posts", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
