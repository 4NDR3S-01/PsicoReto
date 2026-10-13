"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressProvider, useAuth, useProgress } from "@/components/providers";
import { Logo } from "@/components/logo";
import { Splash } from "@/components/ui";
import { currentStreak, reviewQueue } from "@/lib/progress";

const NAV = [
  { href: "/inicio", icon: "🏠", label: "Inicio" },
  { href: "/unidades", icon: "📚", label: "Unidades" },
  { href: "/casos", icon: "🩺", label: "Casos clínicos" },
  { href: "/retos", icon: "🎯", label: "Retos" },
  { href: "/progreso", icon: "📊", label: "Mi progreso" },
  { href: "/glosario", icon: "🔍", label: "Glosario" },
  { href: "/examen", icon: "📝", label: "Modo examen" },
  { href: "/repaso", icon: "🔄", label: "Repaso" },
  { href: "/perfil", icon: "👤", label: "Perfil" },
];

const MOBILE = ["/inicio", "/unidades", "/casos", "/retos"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return <Splash />;
  return (
    <ProgressProvider user={user}>
      <Shell>{children}</Shell>
    </ProgressProvider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { progress, ready } = useProgress();
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const review = reviewQueue(progress).length;

  if (!ready) return <Splash />;

  return (
    <div className="min-h-dvh lg:pl-64">
      {/* Sidebar escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[var(--line)] bg-[var(--surface)] px-3 py-6 lg:flex">
        <Link href="/inicio" className="mb-7 px-3">
          <Logo size={25} />
        </Link>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV.map((n) => {
            const on = active(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  on ? "bg-brand/10 text-brand" : "muted hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="text-xl">{n.icon}</span>
                <span className="flex-1">{n.label}</span>
                {n.href === "/repaso" && review > 0 && (
                  <span className="rounded-full bg-danger px-2 py-0.5 text-xs font-bold text-white">{review}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Barra superior móvil */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface)]/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <Link href="/inicio">
          <Logo size={22} />
        </Link>
        <div className="flex items-center gap-3 text-sm font-extrabold">
          <Link href="/progreso" className="flex items-center gap-1 text-flame">
            🔥 {currentStreak(progress)}
          </Link>
          <Link href="/progreso" className="flex items-center gap-1 text-gold">
            ⭐ {progress.xp}
          </Link>
          <Link
            href="/perfil"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-lg"
          >
            {progress.settings.avatar}
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-5 md:px-8 lg:pb-14 lg:pt-9">{children}</main>

      {/* Navegación inferior móvil */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-[var(--line)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV.filter((n) => MOBILE.includes(n.href)).map((n) => {
          const on = active(n.href);
          return (
            <Link key={n.href} href={n.href} className="flex flex-col items-center gap-0.5 py-2">
              <span className={`rounded-xl px-3 py-0.5 text-2xl ${on ? "bg-brand/10" : ""}`}>{n.icon}</span>
              <span className={`text-[10px] font-bold ${on ? "text-brand" : "muted"}`}>{n.label.split(" ")[0]}</span>
            </Link>
          );
        })}
        <button onClick={() => setMore((v) => !v)} className="relative flex flex-col items-center gap-0.5 py-2">
          <span className={`rounded-xl px-3 py-0.5 text-2xl ${more ? "bg-brand/10" : ""}`}>☰</span>
          <span className="muted text-[10px] font-bold">Más</span>
          {review > 0 && <span className="absolute right-4 top-1.5 h-2.5 w-2.5 rounded-full bg-danger" />}
        </button>
      </nav>

      {more && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMore(false)}>
          <div
            className="animate-slideup absolute inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] grid grid-cols-3 gap-2 rounded-t-3xl border-t border-[var(--line)] bg-[var(--surface)] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.filter((n) => !MOBILE.includes(n.href)).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMore(false)}
                className="card relative flex flex-col items-center gap-1 p-3 text-center text-xs font-bold"
              >
                <span className="text-3xl">{n.icon}</span>
                {n.label}
                {n.href === "/repaso" && review > 0 && (
                  <span className="absolute right-2 top-2 rounded-full bg-danger px-1.5 text-[10px] text-white">{review}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
