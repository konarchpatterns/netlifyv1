const express = require("express");
const serverless = require("serverless-http");
const path = require("path");

const app = express();
const router = express.Router();

// Serve static files from the "public" directory
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// Route to serve the HTML file
router.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Use the router for local development or Netlify production
if (process.env.NETLIFY_DEV) {
  app.use("/", router); // For local development
} else {
  app.use("/.netlify/functions/app", router); // For Netlify
}
module.exports.handler = serverless(app);
