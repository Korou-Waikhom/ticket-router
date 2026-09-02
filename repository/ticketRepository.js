const db = require("../models/db");

async function createTicketRecord(ticketData) {
  const query = `
    INSERT INTO tickets (
      customer_email, 
      original_text, 
      sentiment, 
      intent, 
      urgency, 
      auto_reply_draft
    ) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
  `;

  const values = [
    ticketData.customer_email,
    ticketData.original_text,
    ticketData.sentiment,
    ticketData.intent,
    ticketData.urgency,
    ticketData.auto_reply,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = { createTicketRecord };
