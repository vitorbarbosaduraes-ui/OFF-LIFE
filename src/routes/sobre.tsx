import { createFileRoute, Link } from "@tanstack/react-router";
import { Accessibility, GraduationCap, HeartHandshake, Leaf, Lightbulb, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — OFF-LIFE" },
      { name: "description", content: "Problema, solução, missão, visão e valores do OFF-LIFE." },
      { property: "og:title", content: "Sobre o projeto — OFF-LIFE" },
      { property: "og:description", content: "Conheça o impacto social e a missão do OFF-LIFE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

const VALUES = [
  { icon: GraduationCap, label: "Educação" },
  { icon: HeartHandshake, label: "Inclusão" },
  { icon: Lightbulb, label: "Inovação" },
  { icon: Users, label: "Responsabilidade Social" },
  { icon: Sparkles, label: "Bem-estar" },
  { icon: Leaf, label: "Colaboração" },
  { icon: Accessibility, label: "Acessibilidade" },
];

function Statement({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{label}</div>
      <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">{text}</p>
    </div>
  );
}

function Sobre() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
          <span className="chip bg-background">Sobre o projeto</span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-7xl">
            Tecnologia para criar mais <span className="italic text-clay">vida offline</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            OFF-LIFE é uma startup educacional e social dedicada a reduzir o uso excessivo de celulares entre jovens, conectando-os a
            experiências presenciais transformadoras.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-8">
            <h2 className="font-display text-3xl">O problema</h2>
            <p className="mt-3 text-muted-foreground">
              O uso excessivo de telas tem impactado o desempenho escolar, a socialização e o desenvolvimento físico e emocional de
              crianças e adolescentes. A vida acontece em outro lugar — e muitos jovens estão perdendo o acesso a ela.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground">
            <h2 className="font-display text-3xl">Nossa solução</h2>
            <p className="mt-3 text-primary-foreground/80">
              Uma plataforma de geolocalização inteligente que conecta estudantes a oportunidades gratuitas em escolas, instituições
              culturais, esportivas e sociais próximas à sua localização.
            </p>
          </article>
        </div>
      </section>

      <section className="surface-sand">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3 lg:px-8">
          <Statement
            label="Missão"
            text="Promover o desenvolvimento integral de jovens por meio de experiências presenciais acessíveis, gratuitas e significativas."
          />
          <Statement
            label="Visão"
            text="Ser referência nacional em incentivo à participação juvenil em atividades presenciais e na construção de comunidades mais conectadas."
          />
          <Statement
            label="Impacto"
            text="Reduzir o tempo excessivo de tela, fortalecer vínculos comunitários e elevar a qualidade do desenvolvimento educacional, social e cultural."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="chip">Valores</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Princípios que orientam tudo que construímos.</h2>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
                <v.icon className="h-4 w-4 text-clay" />
              </span>
              <span className="text-sm font-medium">{v.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid gap-6 p-10 md:grid-cols-[1.5fr_1fr] md:items-center md:p-14">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">Vamos construir juntos.</h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Se você é educador, instituição, escola ou jovem, há um lugar para você dentro do OFF-LIFE.
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Link to="/cadastro" className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                Criar conta
              </Link>
              <Link to="/professores" className="rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">
                Sou educador
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
