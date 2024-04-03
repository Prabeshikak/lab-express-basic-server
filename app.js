// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`

const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

// CREATE EXPRESS APP
const app = express();

// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static("public"));
app.use(express.json());
app.use(logger("dev"));

// ROUTES
// Start defining your routes here:
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/home.html");
});

app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/views/blog.html");
});

app.get("/api/projects", (req, res) => {
  // Read projects JSON file
  fs.readFile("./data/projects.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading projects JSON file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const projects = JSON.parse(data);
      res.json(projects);
    } catch (error) {
      console.error("Error parsing projects JSON:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.get("/api/articles", (req, res) => {
  const filePath = path.join(__dirname, "data", "articles.json");

  // Read articles JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading articles JSON file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const articles = JSON.parse(data);
      res.json(articles);
    } catch (error) {
      console.error("Error parsing articles JSON:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/views/not-found.html");
});

// START THE SERVER
// Make your Express server listen on port 5005:
app.listen(5005, () => console.log("My server listening on port 5005"));
