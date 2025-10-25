
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import {
  DollarSign,
  ArrowDown,
  ArrowUp,
  Tag,
  Repeat,
  Text,
  PlusCircle,
  Film,
  Home,
  Building,
} from "lucide-react";
import { Category } from "@/lib/types";

const categories: Category[] = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Lazer",
  "Educação",
  "Impostos",
  "Salário",
  "Trabalho Extra",
  "Investimento",
  "Outros",
];

const categoryIcons: Record<Category, React.ElementType> = {
  Moradia: Home,
  Alimentação: DollarSign,
  Transporte: Building,
  Saúde: PlusCircle,
  Lazer: Film,
  Educação: Home,
  Impostos: DollarSign,
  Salário: DollarSign,
  "Trabalho Extra": DollarSign,
  Investimento: ArrowUp,
  Outros: Tag,
};

const formSchema = z.object({
  amount: z.coerce.number().min(0.01, "O valor deve ser maior que zero."),
  type: z.enum(["income", "expense"]),
  isRecurring: z.boolean().default(false),
  category: z.string().min(1, "A categoria é obrigatória."),
  newCategory: z.string().optional(),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof formSchema>;

export default function TransactionsPage() {
  const [availableCategories, setAvailableCategories] =
    React.useState<string[]>(categories);
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      type: "expense",
      isRecurring: false,
      category: "",
      newCategory: "",
      notes: "",
    },
  });

  const categoryValue = form.watch("category");

  function onSubmit(data: TransactionFormValues) {
    let finalCategory = data.category;
    if (data.category === "new" && data.newCategory) {
      finalCategory = data.newCategory;
      if (!availableCategories.includes(finalCategory)) {
        setAvailableCategories((prev) => [...prev, finalCategory]);
      }
    }
    
    toast({
      title: "Transação Adicionada!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ ...data, category: finalCategory }, null, 2)}
          </code>
        </pre>
      ),
    });
    form.reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Transação</CardTitle>
          <CardDescription>
            Registre suas receitas e despesas para manter o controle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" /> Valor
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0,00"
                          {...field}
                          step="0.01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>
                        <div className="flex items-center gap-2">
                          <ArrowDown className="h-4 w-4" /> Tipo de Transação
                        </div>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center space-x-4 pt-2"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="expense" id="expense" />
                            </FormControl>
                            <FormLabel htmlFor="expense" className="font-normal">
                              Despesa
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="income" id="income" />
                            </FormControl>
                            <FormLabel htmlFor="income" className="font-normal">
                              Receita
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" /> Categoria
                        </div>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">
                            <div className="flex items-center gap-2">
                              <PlusCircle className="h-4 w-4" />
                              Criar nova categoria
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {categoryValue === "new" && (
                  <FormField
                    control={form.control}
                    name="newCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" /> Nova Categoria
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Streaming, Mercado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <Text className="h-4 w-4" /> Observação (Opcional)
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adicione uma nota para esta transação..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4" /> Transação Recorrente
                        </div>
                      </FormLabel>
                      <FormDescription>
                        Marque se esta transação se repete mensalmente.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto">Adicionar Transação</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
