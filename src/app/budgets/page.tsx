import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgets } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default function BudgetsPage() {
  const budgets = getBudgets();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Monthly Budgets</h1>
      <Card>
        <CardHeader>
          <CardTitle>Spending Limits</CardTitle>
          <CardDescription>Track your spending against your monthly budget for each category.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            return (
              <div key={budget.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                <Progress value={percentage} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
