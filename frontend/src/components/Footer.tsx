import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} TaskPay. Todos os direitos
          reservados.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-primary"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-primary"
          >
            Termos de Serviço
          </Link>
        </div>
      </div>
    </footer>
  );
}
