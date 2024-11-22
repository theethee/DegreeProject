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
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// lägger in i uploadmappen
const upload = multer({ storage: storage });

router.put("/posts/:postId", upload.single("file"), async (req, res) => {
  const postId = req.params.postId;

  try {
    const PUBLIC_STATIC_FOLDER = "http://localhost:5000/uploads/";

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json("Need all required fields...");
    }

    const file = req.file;
    let fileurl;
    let filename;
    if (file) {
      const { mimetype, filename: storedFilename, originalname } = file;
      if (mimetype.toString().startsWith("image/")) {
        fileurl = PUBLIC_STATIC_FOLDER + storedFilename;
        filename = originalname;
      }
    }

    console.log("GRATTIS du har uppdaterat en bloggpost");

    const resultQuery = await client.query(
      `UPDATE posts SET title = $1, content = $2, fileurl = $3, filename = $4 WHERE id = $5 RETURNING *;`,
      [title, content, fileurl, filename, postId]
    );

    console.log("resultQuery :", resultQuery);

    // if (rows.length === 0) {
    //   return res.status(404).json({ message: "Post not found" });
    // }

    res.status(200).json({
      message: "Blog post updated successfully",
      data: resultQuery,
    });
  } catch (error) {
    console.error("Error updating blog post", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
