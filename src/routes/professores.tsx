import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";

export const Route = createFileRoute("/professores")({
  head: () => ({
    meta: [
      { title: "Área de Professores e Instrutores — OFF-LIFE" },
      { name: "description", content: "Cadastre-se para atuar em projetos próximos da sua região." },
      { property: "og:title", content: "Área de Professores e Instrutores — OFF-LIFE" },
      { property: "og:description", content: "Conecte sua expertise a projetos sociais, escolas e centros comunitários." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Professores,
});

const STATS = [
  { icon: GraduationCap, k: "+340", v: "professores cadastrados" },
  { icon: BriefcaseBusiness, k: "+120", v: "vagas abertas" },
  { icon: Sparkles, k: "92%", v: "satisfação com projetos" },
  { icon: GraduationCap, k: "15", v: "áreas de atuação" },
];

function Field({ label, type = "text", placeholder, full }: { label: string; type?: string; placeholder?: string; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring focus:ring-4 focus:ring-ring/20"
      />
    </label>
  );
}

function Professores() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="chip bg-background">Para educadores</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl">
              Compartilhe seu conhecimento. <span className="italic text-clay">Transforme histórias.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              OFF-LIFE conecta professores, instrutores e profissionais a projetos presenciais nas suas regiões — em escolas, centros comunitários e oficinas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/oportunidades" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                Ver oportunidades
              </Link>
              <a href="#cadastro" className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-secondary">
                Cadastrar-se
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.v} className="rounded-3xl border border-border bg-background p-6">
                <s.icon className="h-5 w-5 text-clay" />
                <div className="mt-3 font-display text-3xl">{s.k}</div>
                <div className="text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cadastro" className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl">Cadastro profissional</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">Preencha seus dados para que possamos recomendar projetos próximos de você.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-10 grid gap-5 rounded-3xl border border-border bg-card p-7 md:grid-cols-2 md:p-10">
          <Field label="Nome completo" full />
          <Field label="Formação" placeholder="Ex.: Pedagogia, Ed. Física" />
          <Field label="Área de atuação" placeholder="Ex.: Esportes, Música" />
          <Field label="Cidade" />
          <Field label="Bairro" />
          <Field label="Telefone" type="tel" placeholder="(00) 00000-0000" />
          <Field label="E-mail" type="email" placeholder="voce@email.com" full />
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Experiência profissional</span>
            <textarea
              rows={5}
              placeholder="Conte sua trajetória, projetos relevantes e áreas em que gostaria de atuar."
              className="rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:border-ring focus:ring-4 focus:ring-ring/20"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 md:col-span-2">
            <span className="text-xs text-muted-foreground">Ao se cadastrar você concorda com nossa política de privacidade.</span>
            <button className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Enviar cadastro</button>
          </div>
        </form>
      </section>
    </>
  );
}
