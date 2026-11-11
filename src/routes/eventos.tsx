import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos e Oficinas — OFF-LIFE" },
      { name: "description", content: "Campeonatos, torneios, oficinas e feiras educacionais." },
      { property: "og:title", content: "Eventos e Oficinas — OFF-LIFE" },
      { property: "og:description", content: "Inscreva-se em eventos comunitários presenciais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Eventos,
});

const FEATURED = {
  title: "Festival OFF-LIFE de Inverno",
  desc: "Três dias de oficinas, esporte e cultura no Parque Central — entrada gratuita.",
  date: "12 – 14 Jul",
  place: "Parque Central · Belo Horizonte",
};

const EVENTS = [
  { title: "Campeonato Inter-escolas de Futsal", date: "22 Jun", place: "Ginásio Vila Nova", tag: "Esportes" },
  { title: "Torneio Aberto de Xadrez", date: "29 Jun", place: "Centro Cultural", tag: "Lazer" },
  { title: "Oficina de Cerâmica", date: "06 Jul", place: "Casa de Cultura Sul", tag: "Cultura" },
  { title: "Oficina de Música Brasileira", date: "13 Jul", place: "Teatro Comunitário", tag: "Música" },
  { title: "Mostra de Teatro Jovem", date: "20 Jul", place: "Teatro Municipal", tag: "Teatro" },
  { title: "Feira Educacional 2026", date: "10 Ago", place: "Centro de Convenções", tag: "Educação" },
];

function Eventos() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <span className="chip">Eventos e oficinas</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">A agenda da vida offline.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Campeonatos esportivos, oficinas culturais, mostras e feiras — tudo gratuito ou a preços acessíveis.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border surface-sand">
        <div className="grid gap-8 p-10 md:grid-cols-[1.4fr_1fr] md:items-end md:p-14">
          <div>
            <span className="chip bg-background">Destaque · Inscrições abertas</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">{FEATURED.title}</h2>
            <p className="mt-3 max-w-lg text-muted-foreground">{FEATURED.desc}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-clay" /> {FEATURED.date}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-clay" /> {FEATURED.place}</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-clay" /> 1.200+ inscritos</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <button className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Inscrever-se</button>
            <button className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-secondary">Ver programação</button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((ev) => (
          <article key={ev.title} className="flex flex-col rounded-3xl border border-border bg-card p-6 transition hover:border-clay/40">
            <div className="flex items-center justify-between">
              <span className="chip">{ev.tag}</span>
              <span className="text-xs text-muted-foreground">{ev.date}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{ev.title}</h3>
            <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {ev.place}
            </div>
            <button className="mt-6 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-sand">Inscrever-se</button>
          </article>
        ))}
      </div>
    </div>
  );
}
