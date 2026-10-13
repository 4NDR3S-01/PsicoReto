"use client";

import Link from "next/link";
import { Logo, LogoMark, NeuronMascot } from "@/components/logo";

export function Splash() {
  return (
    <div className="gradient-hero flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="animate-float">
        <LogoMark size={72} radius={0.34} />
      </div>
      <p className="font-display text-2xl font-extrabold tracking-tight">
        Psico<span className="text-brand">Reto</span>
      </p>
    </div>
  );
}

export function Bar({
  value,
  color = "var(--color-brand)",
  className = "",
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`h-3.5 w-full overflow-hidden rounded-full bg-[var(--line)] ${className}`}>
      <div
        className="relative h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
      >
        {value > 8 && <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/30" />}
      </div>
    </div>
  );
}

export function PageHeader({
  back,
  title,
  subtitle,
  right,
}: {
  back?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      {back && (
        <Link
          href={back}
          aria-label="Volver"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-lg transition hover:bg-[var(--surface-2)]"
        >
          ←
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="muted mt-1 font-medium">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Stat({
  icon,
  value,
  label,
  color = "var(--color-brand)",
}: {
  icon: string;
  value: React.ReactNode;
  label: string;
  color?: string;
}) {
  return (
    <div className="card flex items-center gap-3 p-3.5">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
        style={{ background: `${color}1f` }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-extrabold leading-none" style={{ color }}>
          {value}
        </p>
        <p className="muted truncate text-xs font-semibold">{label}</p>
      </div>
    </div>
  );
}

export function Mascot({ text, emoji }: { text: React.ReactNode; emoji?: string }) {
  return (
    <div className="flex items-end gap-3">
      {emoji ? (
        <span className="text-5xl drop-shadow-sm">{emoji}</span>
      ) : (
        <NeuronMascot size={58} className="shrink-0" />
      )}
      <div className="card relative flex-1 rounded-2xl p-4 font-medium leading-relaxed">
        <span className="absolute -bottom-px left-6 h-3 w-3 rotate-45 border-b border-l border-[var(--line)] bg-[var(--surface)]" />
        {text}
      </div>
    </div>
  );
}

export function Empty({
  emoji,
  title,
  text,
  action,
}: {
  emoji: string;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center gap-2 p-8 text-center">
      <div className="text-5xl">{emoji}</div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="muted max-w-sm font-medium">{text}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function BrandLink({ href = "/inicio", size = 24 }: { href?: string; size?: number }) {
  return (
    <Link href={href} aria-label="PsicoReto — inicio">
      <Logo size={size} />
    </Link>
  );
}
