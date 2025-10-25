
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
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
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar as CalendarIcon,
  Car,
  Heart,
  BookOpen,
  Landmark,
  Briefcase,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
    name: string;
    icon: React.ElementType;
};

const initialCategories: Category[] = [
  { name: "Moradia", icon: Home },
  { name: "Alimentação", icon: DollarSign },
  { name: "Transporte", icon: Car },
  { name: "Saúde", icon: Heart },
  { name: "Lazer", icon: Film },
  { name: "Educação", icon: BookOpen },
  { name: "Impostos", icon: Landmark },
  { name: "Salário", icon: Briefcase },
  { name: "Trabalho Extra", icon: TrendingUp },
  { name: "Investimento", icon: ArrowUp },
  { name: "Outros", icon: Tag },
];

const availableIcons = [
    { name: "Moradia", icon: Home },
    { name: "Alimentação", icon: DollarSign },
    { name: "Transporte", icon: Car },
    { name: "Saúde", icon: Heart },
    { name: "Lazer", icon: Film },
    { name: "Educação", icon: BookOpen },
    { name: "Impostos", icon: Landmark },
    { name: "Salário", icon: Briefcase },
    { name: "Trabalho Extra", icon: TrendingUp },
    { name: "Investimento", icon: ArrowUp },
    { name: "Outros", icon: Tag },
    { name: "Prédio", icon: Building },
    { name: "Mais", icon: MoreHorizontal },
];

const formSchema = z.object({
  amount: z.coerce.number().min(0.01, "O valor deve ser maior que zero."),
  type: z.enum(["income", "expense"]),
  date: z.date({ required_error: "A data é obrigatória."}),
  isRecurring: z.boolean().default(false),
  category: z.string().min(1, "A categoria é obrigatória."),
  newCategory: z.string().optional(),
  newCategoryIcon: z.string().optional(),
  notes: z.string().optional(),
  description: z.string().min(1, "A descrição é obrigatória."),
});

type TransactionFormValues = z.infer<typeof formSchema>;

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
};

export default function TransactionsPage() {
  const [availableCategories, setAvailableCategories] =
    React.useState<Category[]>(initialCategories);
  const [transactions, setTransactions] = React.useState<TransactionFormValues[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      type: "expense",
      date: new Date(),
      isRecurring: false,
      category: "",
      newCategory: "",
      newCategoryIcon: "Tag",
      notes: "",
      description: "",
    },
  });

  const categoryValue = form.watch("category");

  function onSubmit(data: TransactionFormValues) {
    let finalCategory = data.category;
    if (data.category === "new" && data.newCategory && data.newCategoryIcon) {
      finalCategory = data.newCategory;
      const IconComponent = availableIcons.find(i => i.name === data.newCategoryIcon)?.icon || Tag;
      if (!availableCategories.find(c => c.name === finalCategory)) {
        setAvailableCategories((prev) => [...prev, { name: finalCategory, icon: IconComponent }]);
      }
    }
    
    const newTransaction = { ...data, category: finalCategory };
    setTransactions(prev => [newTransaction, ...prev]);

    toast({
      title: "Transação Adicionada!",
      description: `Sua transação de ${formatCurrency(data.amount)} foi registrada.`,
    });
    form.reset();
    setIsDialogOpen(false);
  }

  const getCategoryIcon = (categoryName: string) => {
    const category = availableCategories.find(c => c.name === categoryName);
    return category ? category.icon : Tag;
  }

  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Transação
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Adicionar Nova Transação</DialogTitle>
                        <DialogDescription>
                        Registre suas receitas e despesas para manter o controle.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                        <Text className="h-4 w-4" /> Descrição
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Conta de luz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CalendarIcon className="h-4 w-4" /> Data da Transação
                                                </div>
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: ptBR })
                                                    ) : (
                                                        <span>Escolha uma data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                    locale={ptBR}
                                                />
                                                </PopoverContent>
                                            </Popover>
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
                            

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
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
                                        {availableCategories.map((cat) => {
                                            const Icon = cat.icon;
                                            return (
                                                <SelectItem key={cat.name} value={cat.name}>
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="h-4 w-4" />
                                                        {cat.name}
                                                    </div>
                                                </SelectItem>
                                            )
                                        })}
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
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="newCategory"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <PlusCircle className="h-4 w-4" /> Nome da Nova Categoria
                                                </div>
                                                </FormLabel>
                                                <FormControl>
                                                <Input
                                                    placeholder="Ex: Streaming"
                                                    {...field}
                                                />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="newCategoryIcon"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <div className="flex items-center gap-2">
                                                            <Tag className="h-4 w-4" /> Ícone da Categoria
                                                        </div>
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione um ícone" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {availableIcons.map((icon) => {
                                                                const Icon = icon.icon;
                                                                return (
                                                                    <SelectItem key={icon.name} value={icon.name}>
                                                                        <div className="flex items-center gap-2">
                                                                            <Icon className="h-4 w-4" />
                                                                            {icon.name}
                                                                        </div>
                                                                    </SelectItem>
                                                                );
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
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
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="ghost">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit">Adicionar Transação</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>
                    Veja abaixo a lista de todas as suas transações registradas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead className="hidden md:table-cell text-right">Data</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => {
                                const Icon = getCategoryIcon(transaction.category);
                                return (
                                <TableRow key={index}>
                                    <TableCell>
                                    <div className="flex items-center gap-2">
                                        {transaction.type === 'income' ? (
                                        <ArrowUpCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                        <ArrowDownCircle className="h-5 w-5 text-red-500" />
                                        )}
                                        <div className="font-medium">{transaction.description}</div>
                                    </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Icon className="h-4 w-4" />
                                            {transaction.category}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right text-muted-foreground">
                                        {format(transaction.date, "dd/MM/yyyy", { locale: ptBR })}
                                    </TableCell>
                                    <TableCell
                                    className={cn(
                                        "text-right font-semibold",
                                        transaction.type === "income"
                                        ? "text-green-600"
                                        : "text-slate-800 dark:text-slate-300"
                                    )}
                                    >
                                    {transaction.type === "income" ? "+" : "-"}
                                    {formatCurrency(transaction.amount)}
                                    </TableCell>
                                </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">
                                    Nenhuma transação registrada ainda.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

    