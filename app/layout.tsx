import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { AuthProvider } from "@/components/providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PsicoReto · Semiología psiquiátrica",
    template: "%s · PsicoReto",
  },
  description:
    "Aprende semiología y psicopatología a tu ritmo: unidades, casos clínicos, retos diarios, repaso espaciado y modo examen.",
  applicationName: "PsicoReto",
  keywords: ["psicopatología", "semiología", "psicología", "casos clínicos", "aprendizaje"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6c4cf1" },
    { media: "(prefers-color-scheme: dark)", color: "#12101d" },
  ],
};

const themeScript = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
