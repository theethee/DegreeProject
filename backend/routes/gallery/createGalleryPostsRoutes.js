const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const multer = require("multer");
// const path = require("path");

// const uploadDirectory = path.join(__dirname, "uploads");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

// FUNKAR MED BARA BILDER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsGallery");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// lägger in i uploadsGallerymappen
const upload = multer({ storage: storage });

router.post("/galleryposts", upload.single("file"), async (req, res) => {
  try {
    const PUBLIC_STATIC_FOLDER = "http://localhost:5000/uploadsgallery/";

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json("Need all required fields...");
    }

    const file = req.file;
    let imageUrl;
    let imageName;
    if (file) {
      const { mimetype, filename, originalname } = file;
      if (mimetype.toString().startsWith("image/")) {
        imageUrl = PUBLIC_STATIC_FOLDER + filename;
        imageName = originalname;
      }
    }

    console.log("GRATTIS du har lagt till i galleriet");

    // const [rows] = await client.query(
    //   `INSERT INTO posts (title, content, imageurl, imagename) VALUES ($1, $2, $3, $4) RETURNING *;`,
    //   [title, content, imageUrl, imageName]
    // );

    const resultGalleryQuery = await client.query(
      `INSERT INTO galleryposts (title, content, imageurl, imagename) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [title, content, imageUrl, imageName]
    );

    res.status(201).json({
      message: "New gallery post created successfully",
      // data: rows[0],
      data: resultGalleryQuery,
    });
  } catch (error) {
    console.error("Error creating new gallery post FAILED", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
