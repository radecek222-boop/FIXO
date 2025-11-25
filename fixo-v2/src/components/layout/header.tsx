"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wrench, Home, History, Database, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Analyzovat", href: "/dashboard", icon: Wrench },
  { name: "Historie", href: "/dashboard/history", icon: History },
  { name: "Databáze", href: "/dashboard/repairs", icon: Database },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary text-white font-bold text-xl">
              F
            </div>
            <span className="font-bold text-xl">FIXO</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Otevřít menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-fixo-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-2" />
              Nastavení
            </Link>
          </Button>
          <Button variant="fixo" size="sm" asChild>
            <Link href="/dashboard">
              <Wrench className="h-4 w-4 mr-2" />
              Analyzovat
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fixo-primary text-white font-bold">
                  F
                </div>
                <span className="font-bold text-lg">FIXO</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Zavřít menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold transition-colors",
                          isActive
                            ? "bg-fixo-primary-light text-fixo-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    Nastavení
                  </Link>
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold text-muted-foreground hover:bg-muted"
                  >
                    <User className="h-5 w-5" />
                    Přihlásit se
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
