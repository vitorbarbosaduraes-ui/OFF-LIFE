import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Dribbble,
  Heart,
  Leaf,
  MapPin,
  Music,
  Palette,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OFF-LIFE — Desconecte da tela. Conecte-se à vida." },
      {
        name: "description",
        content: "Encontre atividades presenciais gratuitas perto de você. Esporte, cultura, educação e bem-estar para jovens.",
      },
      { property: "og:title", content: "OFF-LIFE — Desconecte da tela. Conecte-se à vida." },
      { property: "og:description", content: "Plataforma que conecta jovens a atividades gratuitas presenciais e reduz o tempo de tela." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const STEPS = [
  { n: "01", title: "Crie sua conta", desc: "Em menos de 1 minuto, com informações simples." },
  { n: "02", title: "Escolha seus interesses", desc: "Esportes, cultura, tecnologia, leitura e muito mais." },
  { n: "03", title: "Ative a sua localização", desc: "Para encontrarmos atividades realmente perto de você." },
  { n: "04", title: "Descubra atividades gratuitas", desc: "Mapa inteligente com filtros por área e distância." },
  { n: "05", title: "Participe presencialmente", desc: "Inscreva-se com um toque e compareça ao local." },
  { n: "06", title: "Desenvolva novas habilidades", desc: "Acumule conquistas no OFF-LIFE Rewards." },
];

const BENEFITS = [
  { icon: Sparkles, title: "Menos tempo de tela", desc: "Substitua horas no celular por experiências reais." },
  { icon: BookOpen, title: "Melhor desempenho escolar", desc: "Atenção, foco e disciplina cultivados na vida prática." },
  { icon: Palette, title: "Novos hobbies", desc: "Descubra paixões que estavam à sua espera." },
  { icon: Heart, title: "Saúde física e mental", desc: "Movimento, sono melhor e mais bem-estar." },
  { icon: Users, title: "Desenvolvimento social", desc: "Amizades reais, convivência e empatia." },
  { icon: Leaf, title: "Comunidade ativa", desc: "Mais conexão com o seu bairro e cidade." },
];

const INTERESTS = [
  { icon: Dribbble, label: "Esportes" },
  { icon: Music, label: "Música" },
  { icon: BookOpen, label: "Leitura" },
  { icon: Brain, label: "Xadrez" },
  { icon: Palette, label: "Artes" },
  { icon: Leaf, label: "Meio Ambiente" },
];

function Stat({ k, l }: { k: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-3xl md:text-4xl">{k}</dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-6">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Educação · Bem-estar · Comunidade
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] md:text-7xl">
              Desconecte da tela. <span className="italic text-clay">Conecte-se à vida.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              OFF-LIFE é a plataforma que conecta jovens a atividades presenciais gratuitas perto de casa — esporte, cultura,
              educação e projetos sociais — para reduzir o tempo de tela e impulsionar o desenvolvimento pessoal.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/cadastro"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Criar conta gratuita <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/mapa"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-secondary"
              >
                Ver mapa de atividades
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat k="+820" l="atividades gratuitas" />
              <Stat k="+150" l="instituições parceiras" />
              <Stat k="42%" l="menos tempo de tela" />
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border soft-shadow">
                <img
                  src={hero}
                  alt="Jovens em atividades presenciais ao ar livre"
                  width={1600}
                  height={1100}
                  className="h-[420px] w-full object-cover md:h-[560px]"
                />
              </div>
              <div className="absolute -left-4 bottom-6 hidden w-64 rounded-2xl border border-border bg-background/95 p-4 backdrop-blur soft-shadow md:block">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> a 480 m de você
                </div>
                <div className="mt-1 text-sm font-medium">Clube de Xadrez — Centro Cultural</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="chip">Hoje · 18h</span>
                  <span className="text-xs font-semibold text-clay">Gratuito</span>
                </div>
              </div>
              <div className="absolute -right-2 top-6 hidden w-56 rounded-2xl border border-border bg-background/95 p-4 backdrop-blur soft-shadow md:block">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Trophy className="h-3.5 w-3.5" /> Conquista
                </div>
                <div className="mt-1 text-sm font-medium">+120 pts · Explorador</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-8 lg:px-8">
          <p className="text-sm text-muted-foreground">Mais de 30 áreas de interesse para começar:</p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <span key={i.label} className="chip bg-background">
                <i.icon className="h-3.5 w-3.5" />
                {i.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="chip">Como funciona</span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">Seis passos simples para começar a viver mais offline.</h2>
          </div>
          <Link to="/sobre" className="text-sm font-medium text-clay hover:underline">
            Conheça o projeto →
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-clay/40">
              <span className="font-display text-3xl text-clay">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-sand">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="chip bg-background">Benefícios</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">O que muda quando você sai da tela.</h2>
            <p className="mt-4 text-muted-foreground">
              Mais saúde, mais foco, mais relações reais. Cada atividade é um passo em direção a uma vida mais plena, equilibrada e
              conectada.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-background p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
                  <b.icon className="h-5 w-5 text-clay" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
          <div className="grid gap-8 p-10 md:grid-cols-[1.4fr_1fr] md:p-14">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">Sua próxima experiência presencial está a poucos metros.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/75">
                Crie sua conta gratuita e descubra esportes, oficinas, clubes de leitura e projetos sociais no seu bairro.
              </p>
            </div>
            <div className="flex flex-col gap-3 self-end">
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Criar conta gratuita <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/mapa"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explorar mapa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
