import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Financeiros</CardTitle>
          <CardDescription>Relatórios detalhados e visualizações estarão disponíveis aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Em breve!</p>
        </CardContent>
      </Card>
    </div>
  );
}
