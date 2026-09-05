const ticketService = require("../services/ticketService");

async function handleCreateTicket(req, res) {
  const { customer_email, original_text } = req.body;

  if (!customer_email || !original_text) {
    return res.status(400).json({ error: "Email and text are required" });
  }

  try {
    const newTicket = await ticketService.processNewTicket(
      customer_email,
      original_text,
    );

    res.status(201).json({
      message: "Ticket successfully processed and saved",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "server error while processing ticket" });
  }
}

module.exports = { handleCreateTicket };
