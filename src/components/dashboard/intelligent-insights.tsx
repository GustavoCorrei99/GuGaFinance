"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSpendingInsights } from "@/lib/actions";
import type { Transaction } from "@/lib/types";
import { Loader2, Sparkles } from "lucide-react";

interface IntelligentInsightsProps {
  transactions: Transaction[];
}

export function IntelligentInsights({ transactions }: IntelligentInsightsProps) {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState("");

  const handleGetInsights = () => {
    startTransition(async () => {
      const result = await getSpendingInsights(transactions);
      setInsights(result.insights);
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Intelligent Insights</CardTitle>
        <CardDescription>
          Get AI-powered tips based on your spending habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {insights ? (
          <div className="prose prose-sm dark:prose-invert rounded-lg border bg-muted/50 p-4 text-sm text-foreground">
            {insights}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-4 border-2 border-dashed rounded-lg">
            <Sparkles className="h-8 w-8 mb-2" />
            <p>Click the button to generate personalized financial advice.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGetInsights}
          disabled={isPending}
          className="w-full bg-accent hover:bg-accent/90"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
