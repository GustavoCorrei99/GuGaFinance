"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet as WalletIcon,
  CircleDollarSign,
  Target,
  LineChart,
  Settings,
  HelpCircle,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Painel", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: ArrowLeftRight },
  { href: "/accounts", label: "Contas", icon: WalletIcon },
  { href: "/budgets", label: "Orçamentos", icon: CircleDollarSign },
  { href: "/goals", label: "Metas", icon: Target },
  { href: "/reports", label: "Relatórios", icon: LineChart },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold font-headline">GuGaFinance</span>
        </div>
      </SidebarHeader>

      <SidebarMenu className="flex-1 justify-between">
        <div className="flex flex-col gap-4">
          <SidebarMenuItem>
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-primary/10 text-primary"
                  )}
                  variant="ghost"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            ))}
          </SidebarMenuItem>
        </div>

        <div className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start" variant="ghost">
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </SidebarMenuButton>
            <SidebarMenuButton className="w-full justify-start" variant="ghost">
              <HelpCircle className="h-5 w-5" />
              <span>Ajuda</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
      
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
