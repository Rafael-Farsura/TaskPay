import {
  Shield,
  Wallet,
  UsersRound,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="font-heading text-primary mb-6 text-4xl font-bold">
              Como o TaskPay Transforma o Trabalho Freelance
            </h1>
            <p className="text-muted-foreground mb-8">
              Uma solução blockchain que garante transparência, segurança e
              confiança para freelancers e contratantes.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <CheckCircle2 className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-heading mb-2 text-lg font-semibold">
                    Pagamentos Automatizados
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Smart contracts garantem liberação de pagamentos apenas após
                    aprovação de milestones.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 rounded-full p-3">
                  <Shield className="text-secondary size-6" />
                </div>
                <div>
                  <h3 className="font-heading mb-2 text-lg font-semibold">
                    Sem Intermediários
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Conexão direta entre freelancers e contratantes, reduzindo
                    custos e aumentando transparência.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-destructive/10 rounded-full p-3">
                  <Wallet className="text-destructive size-6" />
                </div>
                <div>
                  <h3 className="font-heading mb-2 text-lg font-semibold">
                    Blockchain Seguro
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Transações registradas na blockchain Ethereum, garantindo
                    rastreabilidade e segurança.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex space-x-4">
              <Button>Começar Agora</Button>
              <Button variant="outline">Documentação</Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-primary/5 rounded-xl p-8">
              <Image
                alt="TaskPay Platform Illustration"
                src="/logo.png"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <h2 className="font-heading mb-6 text-3xl font-bold">
            Como Funciona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 text-center">
              <UsersRound className="text-primary mx-auto mb-4 size-12" />
              <h3 className="font-heading mb-2 text-xl font-semibold">
                Cadastro
              </h3>
              <p className="text-muted-foreground">
                Crie sua conta usando OAuth2 com Google
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center">
              <FileText className="text-secondary mx-auto mb-4 size-12" />
              <h3 className="font-heading mb-2 text-xl font-semibold">
                Definir Projeto
              </h3>
              <p className="text-muted-foreground">
                Estabeleça milestones e termos do contrato
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 text-center">
              <Wallet className="text-destructive mx-auto mb-4 size-12" />
              <h3 className="font-heading mb-2 text-xl font-semibold">
                Pagamento Automático
              </h3>
              <p className="text-muted-foreground">
                Liberação de fundos após aprovação
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
