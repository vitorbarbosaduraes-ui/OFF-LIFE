import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Crown, Flame, Target, Trophy } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "OFF-LIFE Rewards" },
      { name: "description", content: "Pontuação, conquistas e níveis pela sua participação." },
      { property: "og:title", content: "OFF-LIFE Rewards" },
      { property: "og:description", content: "Acumule pontos, desbloqueie conquistas e suba de nível." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rewards,
});

const LEVELS = [
  { name: "Iniciante", pts: "0 – 100", active: false },
  { name: "Explorador", pts: "101 – 400", active: true },
  { name: "Participativo", pts: "401 – 900", active: false },
  { name: "Embaixador OFF-LIFE", pts: "900+", active: false },
];
const ACHIEVEMENTS = [
  { icon: Flame, title: "Sequência de 7 dias", desc: "Uma semana fora da tela.", done: true },
  { icon: Target, title: "5 atividades concluídas", desc: "Compromisso com sua jornada.", done: true },
  { icon: Award, title: "Primeira oficina cultural", desc: "Arte expandiu seu mundo.", done: true },
  { icon: Crown, title: "Embaixador da comunidade", desc: "Convide 3 amigos para participar.", done: false },
];
const RANKING = [
  { pos: 1, name: "Marina S.", city: "Centro", pts: 1820 },
  { pos: 2, name: "Diego R.", city: "Vila Nova", pts: 1640 },
  { pos: 3, name: "Você", city: "Jardim Sul", pts: 1320, you: true },
  { pos: 4, name: "Letícia P.", city: "Bela Vista", pts: 1180 },
  { pos: 5, name: "João M.", city: "Centro", pts: 1090 },
];
const GOALS = [
  { l: "Participar de 2 atividades nesta semana", v: 1, t: 2 },
  { l: "Conhecer uma nova categoria", v: 0, t: 1 },
  { l: "Convidar um amigo", v: 1, t: 3 },
];

function Rewards() {
  const progress = 88;
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <span className="chip">OFF-LIFE Rewards</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Sua jornada vale pontos.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">A cada atividade presencial, você acumula pontos, desbloqueia conquistas e sobe de nível.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-primary p-7 text-primary-foreground lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="chip border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">Nível atual · Explorador</span>
            <Trophy className="h-5 w-5 opacity-80" />
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-6xl md:text-7xl">1320</span>
            <span className="text-sm opacity-75">pontos acumulados</span>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs opacity-80">
              <span>Próximo nível: Participativo</span>
              <span>1320 / 1500 pts</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-foreground/15">
              <div className="h-full rounded-full bg-primary-foreground" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-7">
          <h3 className="font-sans text-sm font-medium uppercase tracking-wider text-muted-foreground">Metas pessoais</h3>
          <ul className="mt-4 space-y-4">
            {GOALS.map((g) => (
              <li key={g.l}>
                <div className="flex justify-between text-sm">
                  <span>{g.l}</span>
                  <span className="text-muted-foreground">{g.v}/{g.t}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-clay" style={{ width: `${(g.v / g.t) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl md:text-3xl">Níveis OFF-LIFE</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((l) => (
            <div key={l.name} className={`rounded-2xl border p-5 ${l.active ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{l.pts} pts</div>
              <div className="mt-1 text-lg font-semibold">{l.name}</div>
              {l.active && (
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-clay">
                  <ArrowUpRight className="h-3 w-3" /> Você está aqui
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="font-display text-2xl md:text-3xl">Conquistas</h2>
          <div className="mt-5 space-y-3">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.title}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${a.done ? "border-border bg-secondary/40" : "border-dashed border-border bg-background opacity-70"}`}
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-background">
                  <a.icon className={`h-5 w-5 ${a.done ? "text-clay" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.desc}</div>
                </div>
                {a.done && <span className="chip">Desbloqueada</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="font-display text-2xl md:text-3xl">Ranking de participação</h2>
          <ol className="mt-5 divide-y divide-border">
            {RANKING.map((r) => (
              <li key={r.pos} className={`flex items-center justify-between py-3 ${r.you ? "rounded-2xl bg-primary/5 px-3" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-medium">{r.pos}</span>
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.city}</div>
                  </div>
                </div>
                <span className="text-sm font-semibold">{r.pts} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
