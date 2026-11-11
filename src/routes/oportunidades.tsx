import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Clock, Funnel, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades profissionais — OFF-LIFE" },
      { name: "description", content: "Atuação em projetos sociais, oficinas, escolas e programas educacionais." },
      { property: "og:title", content: "Oportunidades profissionais — OFF-LIFE" },
      { property: "og:description", content: "Vagas presenciais e voluntárias para educadores e instrutores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Oportunidades,
});

const DISTANCES = ["1 km", "3 km", "5 km", "10 km"];
const AREAS = ["Esportes", "Música", "Tecnologia", "Artes", "Ed. Ambiental"];
const MODES = ["Presencial", "Voluntário"];

const JOBS = [
  { title: "Instrutor(a) de Futsal", org: "Centro Esportivo Vila Nova", type: "Presencial · Remunerado", dist: "0,8 km", time: "Ter, Qui · 18h–20h", tag: "Esportes" },
  { title: "Professor(a) de Violão Iniciante", org: "Casa de Cultura Bela Vista", type: "Presencial · Voluntário", dist: "1,5 km", time: "Sáb · 10h–12h", tag: "Música" },
  { title: "Monitor(a) de Robótica Educacional", org: "Hub Educacional", type: "Presencial · Remunerado", dist: "2,3 km", time: "Qua, Sex · 19h", tag: "Tecnologia" },
  { title: "Facilitador(a) de Oficina de Artes", org: "Centro Comunitário Sul", type: "Presencial · Voluntário", dist: "3,0 km", time: "Dom · 14h–17h", tag: "Artes" },
  { title: "Educador(a) Ambiental", org: "ONG Raízes", type: "Presencial · Remunerado", dist: "4,2 km", time: "Sáb · 8h–11h", tag: "Ed. Ambiental" },
];

function FilterGroup({ title, options, active, onToggle }: { title: string; options: string[]; active?: string[]; onToggle?: (o: string) => void }) {
  return (
    <div className="mt-5">
      <div className="text-xs font-semibold">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = active?.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle?.(o)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Oportunidades() {
  const [areas, setAreas] = useState<string[]>([]);
  const toggle = (a: string) => setAreas((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));
  const list = JOBS.filter((j) => areas.length === 0 || areas.includes(j.tag));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <span className="chip">Oportunidades profissionais</span>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Vagas e voluntariados em projetos perto de você.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Selecionamos oportunidades em projetos sociais, oficinas, escolas parceiras e programas educacionais conforme sua área e localização.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Funnel className="h-3.5 w-3.5" /> Filtros
          </div>
          <FilterGroup title="Distância" options={DISTANCES} />
          <FilterGroup title="Modalidade" options={MODES} />
          <FilterGroup title="Área de atuação" options={AREAS} active={areas} onToggle={toggle} />
          <button className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Aplicar filtros</button>
        </aside>
        <div className="space-y-4">
          {list.map((j) => (
            <article key={j.title} className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="chip">{j.tag}</span>
                <h3 className="mt-2 text-lg font-semibold">{j.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{j.org}</div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {j.type}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {j.dist}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {j.time}</span>
                </div>
              </div>
              <button className="self-start rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 md:self-auto">
                Candidatar-se
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
