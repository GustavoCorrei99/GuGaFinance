import { SummaryCard } from "@/components/dashboard/summary-card";
import { ExpensesChart } from "@/components/dashboard/expenses-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { FinancialGoals } from "@/components/dashboard/financial-goals";
import {
  calculateBalance,
  getTransactions,
  getGoals,
} from "@/lib/data";
import { CreditCard, DollarSign, PiggyBank } from "lucide-react";

export default function DashboardPage() {
  const transactions = getTransactions();
  const goals = getGoals();
  const { balance, income, expenses } = calculateBalance(transactions);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Saldo Atual"
          value={balance}
          icon={DollarSign}
          isCurrency
        />
        <SummaryCard
          title="Renda Total"
          value={income}
          icon={PiggyBank}
          isCurrency
        />
        <SummaryCard
          title="Despesas Totais"
          value={expenses}
          icon={CreditCard}
          isCurrency
        />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <ExpensesChart transactions={transactions} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RecentTransactions transactions={transactions.slice(0, 5)} />
        <FinancialGoals goals={goals} />
      </div>
    </div>
  );
}
