import { Transaction, Account, Goal, Budget } from "@/lib/types";
import { subDays, subMonths } from "date-fns";

const transactions: Transaction[] = [
  { id: "1", date: subDays(new Date(), 2), description: "Supermercado", amount: 150.75, type: "expense", category: "Alimentação", account: "Banco" },
  { id: "2", date: subDays(new Date(), 5), description: "Salário", amount: 5000, type: "income", category: "Salário", account: "Banco" },
  { id: "3", date: subDays(new Date(), 7), description: "Aluguel", amount: 1200, type: "expense", category: "Moradia", account: "Banco" },
  { id: "4", date: subDays(new Date(), 10), description: "Gasolina", amount: 60, type: "expense", category: "Transporte", account: "Cartão de Crédito" },
  { id: "5", date: subDays(new Date(), 12), description: "Jantar Fora", amount: 85.50, type: "expense", category: "Lazer", account: "Cartão de Crédito" },
  { id: "6", date: subDays(new Date(), 15), description: "Conta de Internet", amount: 70, type: "expense", category: "Moradia", account: "Banco" },
  { id: "7", date: subDays(new Date(), 20), description: "Projeto Extra", amount: 500, type: "income", category: "Trabalho Extra", account: "Banco" },
  { id: "8", date: subDays(new Date(), 25), description: "Mensalidade da Academia", amount: 50, type: "expense", category: "Saúde", account: "Cartão de Crédito" },
  { id: "9", date: subMonths(new Date(), 1), description: "Salário", amount: 5000, type: "income", category: "Salário", account: "Banco" },
  { id: "10", date: subMonths(new Date(), 1), description: "Supermercado Antigo", amount: 250, type: "expense", category: "Alimentação", account: "Banco" },
];

const accounts: Account[] = [
  { id: "1", name: "Conta Bancária Principal", type: "Banco", balance: 12500.50 },
  { id: "2", name: "Carteira Física", type: "Carteira", balance: 300 },
  { id: "3", name: "Cartão de Crédito Principal", type: "Cartão de Crédito", balance: -850.25 },
  { id: "4", name: "Poupança para Férias", type: "Poupança", balance: 8000 },
];

const goals: Goal[] = [
  { id: "1", name: "Novo Laptop", targetAmount: 2000, currentAmount: 1200, deadline: new Date("2024-12-31") },
  { id: "2", name: "Viagem ao Japão", targetAmount: 8000, currentAmount: 3500, deadline: new Date("2025-06-30") },
];

const budgets: Budget[] = [
  { id: "1", category: "Alimentação", limit: 600, spent: 405.25 },
  { id: "2", category: "Lazer", limit: 300, spent: 150 },
  { id: "3", category: "Transporte", limit: 200, spent: 60 },
  { id: "4", category: "Moradia", limit: 1300, spent: 1270 },
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
