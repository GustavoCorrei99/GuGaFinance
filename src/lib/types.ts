export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Housing' 
  | 'Food' 
  | 'Transport' 
  | 'Health' 
  | 'Leisure' 
  | 'Education' 
  | 'Taxes' 
  | 'Salary' 
  | 'Side Job' 
  | 'Investment'
  | 'Other';

export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  account: string;
};

export type AccountType = 'Bank' | 'Wallet' | 'Credit Card' | 'Savings' | 'Investment';

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
};

export type Budget = {
  id: string;
  category: Category;
  limit: number;
  spent: number;
};
