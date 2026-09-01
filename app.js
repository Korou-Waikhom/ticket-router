const express = require("express");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/api/tickets", async (req, res) => {
  const { customer_email, original_text } = req.body;

  if (!customer_email || !original_text) {
    return res.status(400).json({ error: "Email and text are required." });
  }

  // TODO: Add AI Classification here
  // TODO: Add Postgres INSERT query here

  res
    .status(202)
    .json({ message: "Ticket received and processing setup is ready." });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
