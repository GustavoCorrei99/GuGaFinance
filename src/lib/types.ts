export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Moradia' 
  | 'Alimentação' 
  | 'Transporte' 
  | 'Saúde' 
  | 'Lazer' 
  | 'Educação' 
  | 'Impostos' 
  | 'Salário' 
  | 'Trabalho Extra' 
  | 'Investimento'
  | 'Outros';

export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  account: string;
};

export type AccountType = 'Banco' | 'Carteira' | 'Cartão de Crédito' | 'Poupança' | 'Investimento';

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
