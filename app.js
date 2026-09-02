const express = require("express");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/api/tickets", async (req, res) => {
  const { customer_email, original_text } = req.body;

  if (!customer_email || !original_text) {
    return res.status(400).json({ error: "Email and text are required" });
  }

  try {
    //  Send text and wait for the classification
    console.log(`Processing ticket for ${customer_email}`);
    const aiData = await classifyTicket(original_text);

    console.log("AI Classification:", aiData);

    res.status(200).json({
      message: "Ticket successfully analyzed!",
      ai_analysis: aiData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error while processing ticket." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
