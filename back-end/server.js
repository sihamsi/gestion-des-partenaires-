const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// Configuring multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const dbConfig = {
  port: process.env.DB_PORT || 3307,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "login",
};

const dbLogin = mysql.createConnection(dbConfig);

dbLogin.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.post("/login/user", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  dbLogin.query(sql, [req.body.email], async (err, data) => {
    if (err) {
      console.error("Error querying users:", err);
      return res.status(500).json({ error: err.message });
    }
    if (data.length > 0) {
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        return res.json("Login successful");
      }
    }
    return res.status(401).json("Invalid email or password");
  });
});

app.get("/login/partenaires", (req, res) => {
  const sql = "SELECT * FROM partenaires";
  dbLogin.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching partenaires:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

app.post(
  "/login/partenaires",
  upload.fields([{ name: "logo" }, { name: "icon" }]),
  (req, res) => {
    const { type, code, nom, contact } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const icon = req.files["icon"] ? req.files["icon"][0].filename : null;

    const sql =
      "INSERT INTO partenaires (type, code, nom, contact, logo, icon) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [type, code, nom, contact, logo, icon];

    dbLogin.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting partenaire:", err);
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);
        return res.status(500).json({ error: err.message });
      }
      return res.json("Partenaire added successfully");
    });
  }
);

app.put(
  "/login/partenaires/:id",
  upload.fields([{ name: "logo" }, { name: "icon" }]),
  (req, res) => {
    const { type, code, nom, contact } = req.body;
    const logo = req.files["logo"] ? req.files["logo"][0].filename : null;
    const icon = req.files["icon"] ? req.files["icon"][0].filename : null;
    const id = req.params.id;

    const sql =
      "UPDATE partenaires SET type = ?, code = ?, nom = ?, contact = ?, logo = ?, icon = ? WHERE id = ?";
    const values = [type, code, nom, contact, logo, icon, id];

    dbLogin.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating partenaire:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.json("Partenaire updated successfully");
    });
  }
);

app.delete("/login/partenaires/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM partenaires WHERE id = ?";

  dbLogin.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting partenaire:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json("Partenaire deleted successfully");
  });
});

const PORT = process.env.PORT || 4308;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
