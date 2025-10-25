import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>Detailed reports and visualizations will be available here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
