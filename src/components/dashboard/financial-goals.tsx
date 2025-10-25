import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Goal } from "@/lib/types";

interface FinancialGoalsProps {
  goals: Goal[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
};

export function FinancialGoals({ goals }: FinancialGoalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metas Financeiras</CardTitle>
        <CardDescription>Acompanhe seu progresso em direção às suas metas de economia.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            return (
                <div key={goal.id}>
                    <div className="flex justify-between mb-1">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                            {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                        </span>
                    </div>
                    <Progress value={percentage} />
                </div>
            )
        })}
      </CardContent>
    </Card>
  );
}
