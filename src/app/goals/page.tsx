import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Metas Financeiras</h1>
       <Card>
        <CardHeader>
          <CardTitle>Suas Metas</CardTitle>
          <CardDescription>O planejamento e o acompanhamento de metas serão implementados aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Em breve!</p>
        </CardContent>
      </Card>
    </div>
  );
}
