const aiService = require("./aiService");
const ticketRepository = require("../repository/ticketRepository");

async function processNewTicket(email, text) {
  const aiData = await aiService.classifyTicket(text);

  const completeTicketData = {
    customer_email: email,
    original_text: text,
    ...aiData,
  };

  const savedTicket =
    await ticketRepository.createTicketRecord(completeTicketData);

  return savedTicket;
}

module.exports = { processNewTicket };
