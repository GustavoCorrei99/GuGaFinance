import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  isCurrency?: boolean;
};

export function SummaryCard({ title, value, icon: Icon, isCurrency = false }: SummaryCardProps) {
  const formattedValue = isCurrency
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    : value.toString();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", value < 0 && 'text-destructive')}>{formattedValue}</div>
      </CardContent>
    </Card>
  );
}
