'use server';

/**
 * @fileOverview An AI agent that provides intelligent spending insights and recommendations based on user spending patterns.
 *
 * - generateSpendingInsights - A function that generates spending insights.
 * - SpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A string containing the user spending data, including categories, amounts, and time periods.'
    ),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'A string containing the intelligent tips and recommendations based on the spending data.'
    ),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function generateSpendingInsights(
  input: SpendingInsightsInput
): Promise<SpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following spending data and provide intelligent tips and recommendations to improve the user's financial habits.\n\nSpending Data:\n{{{spendingData}}}\n\nInsights and Recommendations:`, // Changed prompt here
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
