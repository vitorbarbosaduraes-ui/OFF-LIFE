import { Link } from "@tanstack/react-router";

type FooterLink = { to: string; label: string };

function FooterColumn({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              OL
            </span>
            <span className="font-semibold">OFF-LIFE</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Desconecte da tela. Conecte-se à vida.</p>
        </div>
        <FooterColumn
          title="Plataforma"
          items={[
            { to: "/mapa", label: "Mapa de atividades" },
            { to: "/eventos", label: "Eventos e oficinas" },
            { to: "/rewards", label: "OFF-LIFE Rewards" },
            { to: "/perfil", label: "Meu perfil" },
          ]}
        />
        <FooterColumn
          title="Comunidade"
          items={[
            { to: "/professores", label: "Professores e instrutores" },
            { to: "/oportunidades", label: "Oportunidades" },
            { to: "/dashboard", label: "Painel administrativo" },
          ]}
        />
        <FooterColumn
          title="Projeto"
          items={[
            { to: "/sobre", label: "Sobre o OFF-LIFE" },
            { to: "/sobre", label: "Missão e valores" },
            { to: "/cadastro", label: "Criar conta" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row md:items-center lg:px-8">
          <span>© {new Date().getFullYear()} OFF-LIFE. Educação, bem-estar e comunidade.</span>
          <span>Feito com cuidado para jovens, escolas e instituições parceiras.</span>
        </div>
      </div>
    </footer>
  );
}
