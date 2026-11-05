import { z } from "zod";

export const ALLOWED_CATEGORIES = Object.freeze([
  "BILLING",
  "TECHNICAL",
  "ACCOUNT",
  "GENERAL",
]);

export const ALLOWED_PRIORITIES = Object.freeze([
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export const aiResponseSchema = z.object({
  category: z.enum(ALLOWED_CATEGORIES, {
    errorMap: () => ({ message: "Invalid ticket category provided by AI." }),
  }),
  priority: z.enum(ALLOWED_PRIORITIES, {
    errorMap: () => ({ message: "Invalid ticket priority provided by AI." }),
  }),
  suggestedResponse: z.string().min(1, "Suggested response cannot be empty."),
  confidenceScore: z.number().min(0).max(1),
});

export function parseAndValidateAIResponse(rawOutput) {
  const parsed =
    typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput;
  return aiResponseSchema.parse(parsed);
}
