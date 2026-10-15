import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/proveedores";
import "./globals.css";

const display = Space_Grotesk({ variable: "--f-display", subsets: ["latin"] });
const sans = Manrope({ variable: "--f-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Semiopsique", template: "%s · Semiopsique" },
  description:
    "Explora la galaxia de la semiología psiquiátrica: planetas por función psíquica, misiones, retos diarios, casos clínicos y prueba final.",
  applicationName: "Semiopsique",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b1d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
