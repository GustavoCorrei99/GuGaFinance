import { Transaction, Account, Goal, Budget } from "@/lib/types";
import { subDays, subMonths } from "date-fns";

const transactions: Transaction[] = [
  { id: "1", date: subDays(new Date(), 2), description: "Groceries", amount: 150.75, type: "expense", category: "Food", account: "Bank" },
  { id: "2", date: subDays(new Date(), 5), description: "Salary", amount: 5000, type: "income", category: "Salary", account: "Bank" },
  { id: "3", date: subDays(new Date(), 7), description: "Rent", amount: 1200, type: "expense", category: "Housing", account: "Bank" },
  { id: "4", date: subDays(new Date(), 10), description: "Gas", amount: 60, type: "expense", category: "Transport", account: "Credit Card" },
  { id: "5", date: subDays(new Date(), 12), description: "Dinner Out", amount: 85.50, type: "expense", category: "Leisure", account: "Credit Card" },
  { id: "6", date: subDays(new Date(), 15), description: "Internet Bill", amount: 70, type: "expense", category: "Housing", account: "Bank" },
  { id: "7", date: subDays(new Date(), 20), description: "Side Project", amount: 500, type: "income", category: "Side Job", account: "Bank" },
  { id: "8", date: subDays(new Date(), 25), description: "Gym Membership", amount: 50, type: "expense", category: "Health", account: "Credit Card" },
  { id: "9", date: subMonths(new Date(), 1), description: "Salary", amount: 5000, type: "income", category: "Salary", account: "Bank" },
  { id: "10", date: subMonths(new Date(), 1), description: "Old Groceries", amount: 250, type: "expense", category: "Food", account: "Bank" },
];

const accounts: Account[] = [
  { id: "1", name: "Main Bank Account", type: "Bank", balance: 12500.50 },
  { id: "2", name: "Physical Wallet", type: "Wallet", balance: 300 },
  { id: "3", name: "Primary Credit Card", type: "Credit Card", balance: -850.25 },
  { id: "4", name: "Vacation Savings", type: "Savings", balance: 8000 },
];

const goals: Goal[] = [
  { id: "1", name: "New Laptop", targetAmount: 2000, currentAmount: 1200, deadline: new Date("2024-12-31") },
  { id: "2", name: "Vacation to Japan", targetAmount: 8000, currentAmount: 3500, deadline: new Date("2025-06-30") },
];

const budgets: Budget[] = [
  { id: "1", category: "Food", limit: 600, spent: 405.25 },
  { id: "2", category: "Leisure", limit: 300, spent: 150 },
  { id: "3", category: "Transport", limit: 200, spent: 60 },
  { id: "4", category: "Housing", limit: 1300, spent: 1270 },
];

export const getTransactions = () => transactions;
export const getAccounts = () => accounts;
export const getGoals = () => goals;
export const getBudgets = () => budgets;

export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.balance += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
        acc.balance -= transaction.amount;
      }
      return acc;
    },
    { balance: 0, income: 0, expenses: 0 }
  );
};

export const getCategoryTotals = (transactions: Transaction[]) => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals: { [key: string]: number } = {};

    expenseTransactions.forEach(transaction => {
        if (!categoryTotals[transaction.category]) {
            categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += transaction.amount;
    });

    return Object.entries(categoryTotals).map(([name, total]) => ({
        name,
        total,
    })).sort((a, b) => b.total - a.total);
};
