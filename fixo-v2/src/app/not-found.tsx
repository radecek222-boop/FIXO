import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, Search, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-fixo-primary-light">
            <Wrench className="h-8 w-8 text-fixo-primary" />
          </div>
          <CardTitle className="text-6xl font-bold text-fixo-primary mb-2">404</CardTitle>
          <CardDescription className="text-lg">
            Stránka nenalezena
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Tuto stránku jsme bohužel nenašli. Možná byla přesunuta nebo smazána.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="fixo" className="w-full" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Zpět na úvod
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard">
                <Wrench className="h-4 w-4 mr-2" />
                Otevřít aplikaci
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/dashboard/repairs">
                <Search className="h-4 w-4 mr-2" />
                Procházet opravy
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
