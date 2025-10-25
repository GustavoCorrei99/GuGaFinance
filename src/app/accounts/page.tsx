import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccounts } from "@/lib/data";
import { Banknote, CreditCard, Landmark, PiggyBank, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountType } from "@/lib/types";

const accountIcons: Record<AccountType, React.ElementType> = {
  Banco: Landmark,
  Carteira: Wallet,
  "Cartão de Crédito": CreditCard,
  Poupança: PiggyBank,
  Investimento: Banknote,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};


export default function AccountsPage() {
  const accounts = getAccounts();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Contas e Carteiras</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = accountIcons[account.type];
          return (
            <Card key={account.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
                <Icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="text-xs text-muted-foreground">{account.type}</div>
                <div className={cn("text-3xl font-bold", account.balance < 0 ? 'text-destructive' : '')}>
                  {formatCurrency(account.balance)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
