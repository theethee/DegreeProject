require("dotenv").config();
const express = require("express");
const app = express();
const { Client } = require("pg");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  connectionString: process.env.PGURI,
  user: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
});

client.connect();

// Anger sökvägen till din uploads-mapp
const uploadDirectory = path.join(__dirname, "uploads");
const uploadDirectory2 = path.join(__dirname, "uploadsGallery");

// importerare och konfigurerare routes för admin
const getAdmin = require("./routes/admin/getAdminRoute");
getAdmin.client = client;
app.use(getAdmin);

const loginRoute = require("./routes/admin/loginRoute");
loginRoute.client = client;
app.use(loginRoute);

// importerar och konfigurerar routes för blogg
const getAllPost = require("./routes/blog/getAllPostRoutes");
getAllPost.client = client;
app.use(getAllPost);

const createPost = require("./routes/blog/createPostRoutes");
createPost.client = client;
app.use(createPost);

const deletePost = require("./routes/blog/deletePostRoutes");
deletePost.client = client;
app.use(deletePost);

const putPost = require("./routes/blog/putPostRoutes");
putPost.client = client;
app.use(putPost);

// importerar och konfigurerar routes för gallery
const getAllGalleryPosts = require("./routes/gallery/getAllGalleryPostsRoutes");
getAllGalleryPosts.client = client;
app.use(getAllGalleryPosts);

const createGalleryPosts = require("./routes/gallery/createGalleryPostsRoutes");
createGalleryPosts.client = client;
app.use(createGalleryPosts);

const putGalleryPosts = require("./routes/gallery/putGalleryPostsRoutes");
putGalleryPosts.client = client;
app.use(putGalleryPosts);

const deleteGalleryPosts = require("./routes/gallery/deleteGalleryPostsRoutes");
deleteGalleryPosts.client = client;
app.use(deleteGalleryPosts);

// Använd express.static för att servera filer från uploadsmappen
app.use("/uploads", express.static(uploadDirectory));
app.use("/uploadsgallery", express.static(uploadDirectory2));
app.use(express.static(path.join(path.resolve(), "dist")));

// Funktion för att hasha och spara lösenordet
async function hashPasswordAndSave(username, password) {
  try {

    // saltRounds = slumpmässig sträng som läggs till
    const saltRounds = 10; //saltRounds körs 10. För högt antal = långsammare laddning
    const hashedPassword = await bcrypt.hash(password, saltRounds); //Hashar lösenordet med bcrypt + saltRounds

    // Uppdatera admin-tabellen med det hashade lösenordet
    const query = `
      UPDATE admin
      SET password = $1
      WHERE user_name = $2;
    `;
    const values = [hashedPassword, username];

    await client.query(query, values); //query uppdaterar lösenordet

    console.log("Password successfully hashed and updated ");
  } catch (err) {
    console.error("Error hashing or updating password:", err);
  }
}

// Använd funktionen för att hasha och spara lösenordet
const username = process.env.ADMIN_USERNAME; //hämtar username från dotenv
const password = process.env.ADMIN_PASSWORD; //hämtar password från dotenv
hashPasswordAndSave(username, password); //anropar funktionen för att hasha och spara i databasen



app.listen(5000, () => {
  console.log("Redo på http://localhost:5000/");
});
