import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Heart, MapPin, PenLine, Settings, Trophy } from "lucide-react";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — OFF-LIFE" },
      { name: "description", content: "Histórico, favoritos, interesses e nível." },
      { property: "og:title", content: "Meu perfil — OFF-LIFE" },
      { property: "og:description", content: "Acompanhe sua jornada presencial e sua evolução." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

const INTERESTS = ["Leitura", "Xadrez", "Música", "Tecnologia", "Meio Ambiente"];
const HISTORY = [
  { name: "Clube de Leitura Jovem", date: "12 Mai", pts: 80, status: "Concluída" },
  { name: "Curso de Programação", date: "08 Mai", pts: 120, status: "Concluída" },
  { name: "Oficina de Teatro", date: "02 Mai", pts: 100, status: "Concluída" },
  { name: "Mutirão Ambiental", date: "28 Abr", pts: 150, status: "Concluída" },
];
const FAVORITES = [
  { name: "Escolinha de Futsal", dist: "0,4 km" },
  { name: "Torneio de Xadrez", dist: "2,3 km" },
  { name: "Clube de Leitura", dist: "0,8 km" },
];
const STATS = [
  { l: "Pontuação", v: "1.320", s: "pts acumulados" },
  { l: "Atividades", v: "12", s: "concluídas" },
  { l: "Conquistas", v: "07", s: "desbloqueadas" },
  { l: "Sequência", v: "9 dias", s: "fora da tela" },
];

function Perfil() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="rounded-3xl border border-border bg-card p-7 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sand to-sand-deep text-2xl font-semibold text-primary">MR</div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Maria Rocha</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Jardim Sul · Belo Horizonte</span>
                <span className="chip">Nível Explorador</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
              <PenLine className="h-3.5 w-3.5" /> Editar perfil
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
              <Settings className="h-3.5 w-3.5" /> Configurações
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-1 font-display text-3xl">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl md:text-3xl">Histórico de atividades</h2>
            <span className="chip"><Calendar className="h-3 w-3" /> Últimos 30 dias</span>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {HISTORY.map((h) => (
              <li key={h.name} className="flex items-center justify-between py-4">
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-muted-foreground">{h.date} · {h.status}</div>
                </div>
                <div className="flex items-center gap-2 text-sm"><Trophy className="h-4 w-4 text-clay" /> +{h.pts} pts</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-7">
            <h3 className="font-display text-2xl">Interesses</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {INTERESTS.map((i) => <span key={i} className="chip">{i}</span>)}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7">
            <h3 className="font-display text-2xl">Favoritos</h3>
            <ul className="mt-4 space-y-3">
              {FAVORITES.map((f) => (
                <li key={f.name} className="flex items-center justify-between rounded-2xl bg-secondary/50 p-3">
                  <div>
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.dist}</div>
                  </div>
                  <Heart className="h-4 w-4 fill-clay text-clay" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
