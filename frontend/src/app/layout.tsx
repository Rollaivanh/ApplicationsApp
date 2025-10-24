import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // 👈 importamos el contexto

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Registro de Postulaciones",
  description: "Aplicación con Tailwind y ShadCN UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="container mx-auto flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
