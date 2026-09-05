const ticketService = require("../services/ticketService");
const aiService = require("../services/aiService");
const ticketRepository = require("../repository/ticketRepository");

jest.mock("../services/aiService");
jest.mock("../repository/ticketRepository");

describe("Ticket Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("combine AI data and save ticket", async () => {
    const fakeEmail = "test@example.com";
    const fakeText = "My screen is broken";

    const fakeAiResponse = {
      sentiment: "Angry",
      intent: "Tech Support",
      urgency: "High",
      auto_reply: "We will fix your screen",
    };

    const fakeDbResponse = {
      id: 1,
      customer_email: fakeEmail,
      original_text: fakeText,
      ...fakeAiResponse,
    };

    aiService.classifyTicket.mockResolvedValue(fakeAiResponse);
    ticketRepository.createTicketRecord.mockResolvedValue(fakeDbResponse);

    const result = await ticketService.processNewTicket(fakeEmail, fakeText);

    expect(aiService.classifyTicket).toHaveBeenCalledWith(fakeText);
    expect(ticketRepository.createTicketRecord).toHaveBeenCalledWith({
      customer_email: fakeEmail,
      original_text: fakeText,
      ...fakeAiResponse,
    });
    expect(result.id).toBe(1);
    expect(result.intent).toBe("Tech Support");
  });
});
