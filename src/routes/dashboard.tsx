import { createFileRoute } from "@tanstack/react-router";
import { Activity, Building2, Calendar, Clock, GraduationCap, Sparkles, TrendingUp, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard administrativo — OFF-LIFE" },
      { name: "description", content: "Indicadores estratégicos e relatórios gerenciais." },
      { property: "og:title", content: "Dashboard administrativo — OFF-LIFE" },
      { property: "og:description", content: "Acompanhe usuários, parcerias, eventos e engajamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const GROWTH = [
  { m: "Jan", v: 1200 },
  { m: "Fev", v: 1800 },
  { m: "Mar", v: 2400 },
  { m: "Abr", v: 3100 },
  { m: "Mai", v: 4200 },
  { m: "Jun", v: 5400 },
];
const BY_CATEGORY = [
  { c: "Esporte", v: 320 },
  { c: "Cultura", v: 240 },
  { c: "Educação", v: 180 },
  { c: "Lazer", v: 120 },
  { c: "Social", v: 90 },
];
const AGES = [
  { name: "13–15", value: 38 },
  { name: "16–18", value: 34 },
  { name: "19–21", value: 18 },
  { name: "22+", value: 10 },
];
const PIE_COLORS = ["var(--chart-5)", "var(--chart-1)", "var(--chart-2)", "var(--chart-4)"];

const KPIS = [
  { icon: Users, l: "Usuários cadastrados", v: "12.480", d: "+8,4%" },
  { icon: Activity, l: "Atividades disponíveis", v: "823", d: "+12%" },
  { icon: Building2, l: "Instituições parceiras", v: "154", d: "+6" },
  { icon: GraduationCap, l: "Professores cadastrados", v: "342", d: "+18" },
  { icon: Calendar, l: "Eventos realizados", v: "96", d: "Últ. 30d" },
  { icon: Sparkles, l: "Participações registradas", v: "31.250", d: "+14%" },
  { icon: TrendingUp, l: "Índice de engajamento", v: "78%", d: "+3 pts" },
  { icon: Clock, l: "Horas de atividade", v: "62.110", d: "Total" },
];

function Panel({ title, subtitle, children, wide }: { title: string; subtitle?: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-3xl border border-border bg-card p-6 ${wide ? "lg:col-span-2" : ""}`}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

const axis = { stroke: "var(--muted-foreground)", tickLine: false, axisLine: false, fontSize: 12 } as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip">Painel administrativo</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Visão geral da plataforma</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">Indicadores estratégicos atualizados em tempo real para times educacionais e parceiros.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Últimos 30 dias</button>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Exportar relatório</button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <k.icon className="h-4 w-4 text-clay" />
              <span className="text-xs text-muted-foreground">{k.d}</span>
            </div>
            <div className="mt-4 font-display text-3xl">{k.v}</div>
            <div className="text-sm text-muted-foreground">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Panel title="Crescimento de usuários" subtitle="Últimos 6 meses" wide>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={GROWTH} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="m" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Faixa etária" subtitle="Distribuição de participantes">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={AGES} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {AGES.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {AGES.map((a, i) => (
              <li key={a.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                <span className="text-muted-foreground">{a.name}</span>
                <span className="ml-auto font-medium">{a.value}%</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Atividades por categoria" subtitle="Top 5" wide>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={BY_CATEGORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="c" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey="v" radius={[8, 8, 0, 0]} fill="var(--clay)" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Relatórios recentes">
          <ul className="divide-y divide-border text-sm">
            {[
              "Engajamento por instituição · Mai 2026",
              "Impacto educacional · Q1 2026",
              "Adesão de professores · Abr 2026",
              "Eventos comunitários · Trimestral",
            ].map((r) => (
              <li key={r} className="flex items-center justify-between py-3">
                <span>{r}</span>
                <button className="text-xs font-medium text-clay hover:underline">Baixar</button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
