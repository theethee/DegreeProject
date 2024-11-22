const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.post("/admin", async (req, res) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
      res.status(400).json("Need all required fields...");
    }

    console.log("Grattis du har skapat en admin-användare");

    const adminQuery = await client.query(
      `INSERT INTO admin (user_name, password) VALUES ($1, $2) RETURNING *;`[
        (user_name, password)
      ]
    );

    res.status(201).json({
      message: "New gallery post created successfully",
      data: adminQuery,
    });
  } catch (error) {
    console.error("Error creating admin FAILED", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
