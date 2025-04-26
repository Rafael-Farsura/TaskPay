import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src="/logo.png"
            alt="Logo TaskPay"
            width={100}
            height={100}
            className="rounded-3xl shadow-xl w-auto h-auto"
          />
        </Link>
        <nav className="space-x-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary hover:underline"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-primary hover:underline"
          >
            Sobre
          </Link>
          <Link
            href="/startHere"
            className="text-muted-foreground hover:text-primary hover:underline"
          >
            Comece Agora
          </Link>
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline "
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
