import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CodeXml,
  Cpu,
  Dribbble,
  Leaf,
  Music,
  Palette,
  Sparkles,
  Theater,
  Trophy,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — OFF-LIFE" },
      { name: "description", content: "Crie sua conta gratuita e escolha seus interesses." },
      { property: "og:title", content: "Criar conta — OFF-LIFE" },
      { property: "og:description", content: "Cadastro simples para descobrir atividades presenciais gratuitas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cadastro,
});

const INTERESTS = [
  { label: "Futebol", icon: Dribbble },
  { label: "Vôlei", icon: Trophy },
  { label: "Basquete", icon: Dribbble },
  { label: "Futsal", icon: Dribbble },
  { label: "Xadrez", icon: Brain },
  { label: "Dama", icon: Brain },
  { label: "Música", icon: Music },
  { label: "Dança", icon: Sparkles },
  { label: "Teatro", icon: Theater },
  { label: "Leitura", icon: BookOpen },
  { label: "Artes", icon: Palette },
  { label: "Tecnologia", icon: Cpu },
  { label: "Programação", icon: CodeXml },
  { label: "Robótica", icon: Cpu },
  { label: "Meio Ambiente", icon: Leaf },
  { label: "Outros", icon: Sparkles },
];

function Field({ label, type = "text", placeholder, full }: { label: string; type?: string; placeholder?: string; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 rounded-xl border border-input bg-background px-4 text-sm outline-none ring-ring/20 transition focus:border-ring focus:ring-4"
      />
    </label>
  );
}

function Cadastro() {
  const [selected, setSelected] = useState<string[]>(["Leitura", "Xadrez"]);
  const toggle = (label: string) => setSelected((s) => (s.includes(label) ? s.filter((x) => x !== label) : [...s, label]));

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_360px] lg:px-8">
      <div>
        <span className="chip">Passo 1 de 2</span>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Crie sua conta OFF-LIFE</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Em poucos minutos você terá acesso a atividades presenciais gratuitas recomendadas pela sua localização e interesses.
        </p>

        <form className="mt-10 grid gap-5 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <Field label="Nome completo" placeholder="Como você gosta de ser chamado" full />
          <Field label="Data de nascimento" type="date" />
          <Field label="Cidade" placeholder="Sua cidade" />
          <Field label="Bairro" placeholder="Seu bairro" />
          <Field label="Escola" placeholder="Nome da escola" full />
          <Field label="Série" placeholder="Ex.: 9º ano, 1º ano EM" />
          <Field label="E-mail" type="email" placeholder="voce@email.com" />
          <Field label="Senha" type="password" placeholder="••••••••" full />
        </form>

        <div className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl md:text-3xl">Seus interesses</h2>
              <p className="mt-1 text-sm text-muted-foreground">Selecione tudo que combina com você. Você pode mudar depois.</p>
            </div>
            <span className="text-xs text-muted-foreground">{selected.length} selecionados</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {INTERESTS.map((it) => {
              const on = selected.includes(it.label);
              return (
                <button
                  key={it.label}
                  type="button"
                  onClick={() => toggle(it.label)}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    on ? "border-primary bg-primary/5" : "border-border bg-card hover:border-clay/40"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${
                      on ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    <it.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{it.label}</span>
                  {on && <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar ao início
          </Link>
          <Link
            to="/questionario"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Criar conta <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <aside className="h-fit rounded-3xl border border-border bg-secondary/50 p-7 lg:sticky lg:top-24">
        <h3 className="font-display text-2xl">O que vem depois</h3>
        <ol className="mt-5 space-y-4 text-sm">
          {[
            "Responda 5 perguntas rápidas para descobrir seu perfil OFF-LIFE.",
            "Receba recomendações de atividades gratuitas perto de você.",
            "Ganhe pontos e conquistas ao participar.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-xs text-muted-foreground">
          Seus dados são protegidos. Usamos apenas para recomendar atividades e enviar notificações sobre vagas próximas.
        </div>
      </aside>
    </div>
  );
}
