import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeSection() {
  return (
    <div className="bg-background relative w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary h-1 w-12" />
            <span className="text-muted-foreground font-medium">
              Freelancing Descentralizado
            </span>
          </div>
          <h1 className="font-heading text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
            Trabalhe com
            <span className="text-primary">confiança</span>. Pague com
            <span className="text-slate-400">segurança</span>.
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            TaskPay conecta freelancers e contratantes através de pagamentos
            automatizados por smart contracts, eliminando intermediários e
            garantindo transações justas e seguras.
          </p>
          <div className="flex space-x-4 ">
            <Link href="/startHere">
              <Button className="bg-primary hover:bg-primary/90 bg-black">
                Comece Agora
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden items-center justify-center lg:flex">
          <div className="relative aspect-square w-full max-w-md">
            <div className="bg-primary/10 absolute inset-0 rounded-full blur-3xl" />
            <div className="bg-card border-border relative z-10 rounded-2xl border p-6 shadow-lg">
              <div className="mb-4 flex items-center space-x-4">
                <div className="bg-primary/20 flex size-12 items-center justify-center rounded-full">
                  <Check className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">
                    Milestone Aprovado
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Pagamento Liberado
                  </p>
                </div>
              </div>
              <div className="bg-muted/50 mb-4 h-px w-full" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total do Milestone
                  </span>
                  <span className="font-semibold">0.5 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-cyan-600 font-medium">Concluído</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="from-primary/5 to-secondary/5 absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-bl" />
    </div>
  );
}
