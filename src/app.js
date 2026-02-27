const express = require("express");

const app = express();

app.use(express.json());

app.post("/input", (req, res) => {
  res.status(200).json({ received: req.body });
});

app.post("/sessions", (_req, res) => {
  res.sendStatus(201);
});

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

module.exports = app;
