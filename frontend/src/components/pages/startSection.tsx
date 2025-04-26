import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function StartSection() {
  return (
    <div className="bg-background min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-primary mb-4 text-3xl font-bold md:text-4xl">
            Comece Sua Jornada no TaskPay
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Conecte-se com freelancers talentosos ou encontre projetos incríveis
            com pagamentos seguros e automatizados.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                Sou Freelancer
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Encontre projetos, estabeleça marcos e receba pagamentos
                garantidos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="default" className="w-full">
                  Criar Perfil de Freelancer
                </Button>
                <div className="flex items-center">
                  <Separator className="grow" />
                  <span className="text-muted-foreground px-4 text-sm">ou</span>
                  <Separator className="grow" />
                </div>
                <Button variant="outline" className="w-full">
                  Explorar Projetos
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                Sou Contratante
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Encontre freelancers qualificados e gerencie projetos com marcos
                seguros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="default" className="w-full">
                  Publicar Projeto
                </Button>
                <div className="flex items-center">
                  <Separator className="grow" />
                  <span className="text-muted-foreground px-4 text-sm">ou</span>
                  <Separator className="grow" />
                </div>
                <Button variant="outline" className="w-full">
                  Buscar Freelancers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 text-center">
          <h2 className="font-heading text-primary text-2xl font-semibold">
            Como Funciona
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-secondary/10 rounded-lg p-6 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  fill="none"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22v-7l-2-2V7a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6l-2 2v7" />
                  <path d="M6 12l4-4" />
                  <path d="M18 12l-4-4" />
                </svg>
              </div>
              <h3 className="font-heading mb-2 text-lg">Crie Projeto</h3>
              <p className="text-muted-foreground text-sm">
                Defina marcos claros e orçamento para seu projeto
              </p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-6 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  fill="none"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect x="2" y="4" rx="2" width="20" height="16" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-heading mb-2 text-lg">
                Selecione Freelancer
              </h3>
              <p className="text-muted-foreground text-sm">
                Escolha o profissional ideal para seu projeto
              </p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-6 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  fill="none"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22v-7l-2-2V7a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6l-2 2v7" />
                  <path d="M10 14.5l2-2 2 2" />
                  <path d="M14 10l2-2" />
                  <path d="M8 10l-2-2" />
                </svg>
              </div>
              <h3 className="font-heading mb-2 text-lg">Marcos Seguros</h3>
              <p className="text-muted-foreground text-sm">
                Libere pagamentos apenas após aprovação de marcos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
