const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World from api!" });
});

// Serve compiled frontend (production)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route for React routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(4000, () => console.log("Server running on port 4000"));
