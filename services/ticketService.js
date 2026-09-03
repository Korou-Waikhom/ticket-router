const aiService = require("./aiService");
const ticketRepository = require("../repositories/ticketRepository");

async function processNewTicket(email, text) {
  const aiData = await aiService.classifyTicketText(text);

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
