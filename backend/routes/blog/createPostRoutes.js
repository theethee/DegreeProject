const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const multer = require("multer");



const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

// Konfigurerar multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads"); //pekar på mappen där filen ska sparas
  },
  filename: (_req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname); //sparas med unikt namn för varje fil
  },
});

// Tillåter endast jpeg, png, mp4
const acceptedFiles = (_req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); //godkänd fil
  } else {
    cb(
      new Error("Invalid file type. Only images and MP4 videos are allowed."), //icke godkänd fil
      false
    );
  }
};

//kollar var filerna ska sparas och vilka filer som tillåts
const upload = multer({
  storage: storage,
  fileFilter: acceptedFiles,
});

// Post-rutt
router.post("/posts", upload.single("file"), async (req, res) => {
  try {
    const PUBLIC_STATIC_FOLDER = "http://localhost:5000/uploads/";

    // hämtar title och content
    const { title, content } = req.body;

    // Kolla om title och content är ifyllda
    if (!title || !content) {
      return res.status(400).json("Need all required fields...");
    }

    // Hämtar den uppladdade filen
    const file = req.file;
    let fileurl;
    let filename;

    // kollar om filen har laddast upp, om fil laddast upp, skapas URL för filen och namnet sparas
    if (file) {
      const { filename: storedFilename, originalname } = file;
      fileurl = PUBLIC_STATIC_FOLDER + storedFilename;
      filename = originalname;
    }

    // sparar i databasen
    const resultQuery = await client.query(
      `INSERT INTO posts (title, content, fileurl, filename) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [title, content, fileurl, filename]
    );

    res.status(201).json({
      message: "New blog post created successfully",
      data: resultQuery.rows[0],
    });
  } catch (error) {
    console.error("Error creating new blog post FAILED", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
