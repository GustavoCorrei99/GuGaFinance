"use server";

import { generateSpendingInsights } from "@/ai/flows/intelligent-spending-insights";
import type { Transaction } from "@/lib/types";

export async function getSpendingInsights(transactions: Transaction[]) {
  try {
    const expenseTransactions = transactions.filter((t) => t.type === "expense");
    
    if (expenseTransactions.length === 0) {
      return { insights: "No spending data available to analyze. Start by adding some expenses!" };
    }

    const spendingData = expenseTransactions
      .map(
        (t) => `Category: ${t.category}, Amount: ${t.amount.toFixed(2)}`
      )
      .join("; ");

    const result = await generateSpendingInsights({ spendingData });
    return result;
  } catch (error) {
    console.error("Error generating spending insights:", error);
    return { insights: "Sorry, I couldn't generate insights at this moment. Please try again later." };
  }
}
