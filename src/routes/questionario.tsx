import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Brain, Compass, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/questionario")({
  head: () => ({
    meta: [
      { title: "Questionário de perfil — OFF-LIFE" },
      { name: "description", content: "Descubra seu perfil OFF-LIFE em 5 perguntas." },
      { property: "og:title", content: "Questionário de perfil — OFF-LIFE" },
      { property: "og:description", content: "Cinco perguntas rápidas para personalizar suas recomendações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Questionario,
});

type ProfileKey = "ativo" | "criativo" | "estrategico" | "explorador" | "social";

const PROFILES: Record<ProfileKey, { name: string; icon: LucideIcon; desc: string }> = {
  ativo: { name: "Perfil Ativo", icon: Activity, desc: "Você floresce em movimento — esportes, dança, ar livre." },
  criativo: { name: "Perfil Criativo", icon: Sparkles, desc: "Expressão, artes e música falam a sua língua." },
  estrategico: { name: "Perfil Estratégico", icon: Brain, desc: "Você ama desafios mentais, lógica e planejamento." },
  explorador: { name: "Perfil Explorador", icon: Compass, desc: "Curiosidade é seu motor — natureza, ciência, tecnologia." },
  social: { name: "Perfil Social", icon: Users, desc: "Você cresce em grupo, projetos sociais e comunidade." },
};

const QUESTIONS: { q: string; options: { label: string; tag: ProfileKey }[] }[] = [
  {
    q: "Quantas horas por dia você utiliza o celular?",
    options: [
      { label: "Menos de 2h", tag: "ativo" },
      { label: "Entre 2h e 4h", tag: "explorador" },
      { label: "Entre 4h e 6h", tag: "criativo" },
      { label: "Mais de 6h", tag: "social" },
    ],
  },
  {
    q: "Participa de alguma atividade presencial atualmente?",
    options: [
      { label: "Sim, esportiva", tag: "ativo" },
      { label: "Sim, cultural", tag: "criativo" },
      { label: "Sim, educacional", tag: "estrategico" },
      { label: "Ainda não", tag: "explorador" },
    ],
  },
  {
    q: "Qual atividade você gostaria de conhecer?",
    options: [
      { label: "Esporte coletivo", tag: "ativo" },
      { label: "Oficina de arte ou música", tag: "criativo" },
      { label: "Xadrez ou robótica", tag: "estrategico" },
      { label: "Projeto social", tag: "social" },
    ],
  },
  {
    q: "Você prefere atividades individuais ou em grupo?",
    options: [
      { label: "Individuais", tag: "estrategico" },
      { label: "Em grupo pequeno", tag: "criativo" },
      { label: "Em grupo grande", tag: "social" },
      { label: "Tanto faz", tag: "explorador" },
    ],
  },
  {
    q: "Qual é o seu principal objetivo?",
    options: [
      { label: "Ter mais saúde", tag: "ativo" },
      { label: "Aprender algo novo", tag: "explorador" },
      { label: "Conhecer pessoas", tag: "social" },
      { label: "Desenvolver talentos", tag: "criativo" },
    ],
  },
];

function Questionario() {
  const [answers, setAnswers] = useState<(ProfileKey | null)[]>(() => Array(QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);

  const result = useMemo<ProfileKey | null>(() => {
    if (!done) return null;
    const count: Partial<Record<ProfileKey, number>> = {};
    answers.forEach((a) => a && (count[a] = (count[a] || 0) + 1));
    return (Object.entries(count).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0] as ProfileKey) || "explorador";
  }, [done, answers]);

  const complete = answers.every(Boolean);

  if (done && result) {
    const p = PROFILES[result];
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 text-center soft-shadow">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary">
            <p.icon className="h-7 w-7 text-clay" />
          </div>
          <span className="chip mt-6">Seu perfil OFF-LIFE</span>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">{p.name}</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{p.desc}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {(Object.entries(PROFILES) as [ProfileKey, (typeof PROFILES)[ProfileKey]][]).map(([key, val]) => (
              <div
                key={key}
                className={`rounded-2xl border p-3 text-xs ${
                  key === result ? "border-primary bg-primary/5 font-medium" : "border-border bg-secondary/40 text-muted-foreground"
                }`}
              >
                {val.name.replace("Perfil ", "")}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Ver atividades para você <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/perfil" className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">
              Ir para meu perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
      <span className="chip">Questionário rápido</span>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Descubra seu perfil OFF-LIFE</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Cinco perguntas para personalizarmos suas recomendações de atividades presenciais.</p>

      <div className="mt-10 space-y-6">
        {QUESTIONS.map((question, qi) => (
          <div key={qi} className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-clay">{String(qi + 1).padStart(2, "0")}</span>
              <h2 className="text-lg font-semibold md:text-xl">{question.q}</h2>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {question.options.map((o) => {
                const on = answers[qi] === o.tag;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[qi] = o.tag;
                        return next;
                      })
                    }
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      on ? "border-primary bg-primary/5 font-medium" : "border-border bg-background hover:border-clay/40"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <span className="text-sm text-muted-foreground">
          {answers.filter(Boolean).length}/{QUESTIONS.length} respondidas
        </span>
        <button
          disabled={!complete}
          onClick={() => setDone(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ver meu perfil <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
