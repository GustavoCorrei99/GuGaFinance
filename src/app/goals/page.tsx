import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
       <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
          <CardDescription>Goal planning and tracking will be implemented here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
