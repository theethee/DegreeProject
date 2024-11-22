const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const multer = require("multer");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadsGallery");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// lägger in i uploadmappen
const upload = multer({ storage: storage });

router.put("/galleryposts/:gallerypostId", upload.single("file"), async (req, res) => {
  const gallerypostId = req.params.gallerypostId;

  try {
    const PUBLIC_STATIC_FOLDER = "http://localhost:5000/uploadsgallery/";

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json("Need all required fields...");
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

    console.log("GRATTIS du har uppdaterat en bloggpost");

    const resultGalleryQuery = await client.query(
      `UPDATE galleryposts SET title = $1, content = $2, imageurl = $3, imagename = $4 WHERE id = $5 RETURNING *;`,
      [title, content, imageUrl, imageName, gallerypostId]
    );

    console.log("resultGalleryQuery :", resultGalleryQuery);

    // if (rows.length === 0) {
    //   return res.status(404).json({ message: "Post not found" });
    // }

    res.status(200).json({
      message: "gallery post updated successfully",
      data: resultGalleryQuery,
    });
  } catch (error) {
    console.error("Error updating gallery post", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
