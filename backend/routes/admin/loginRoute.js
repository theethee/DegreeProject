const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
  user: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
});

client.connect();

router.post("/login", async (req, res) => {
  // Hämtar användarnamn och lösenord
  const { username, password } = req.body;

  try {
    // query för att hämta användare med specifikt användanamn
    const query = "SELECT * FROM admin WHERE user_name = $1";
    // returnerar resultatet
    const result = await client.query(query, [username]);

    // kollar om användaren finns i databasen
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Hämtar admin-data
    const admin = result.rows[0];
    // jämför hashade lösenordet med det inmatade lösenord
    const validPassword = await bcrypt.compare(password, admin.password);

    // om löseonrodet inte matchar
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }


    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
