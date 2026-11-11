import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Clock, Funnel, LocateFixed, MapPin, Search, Star, Users } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  DEFAULT_CENTER,
  RADIUS_OPTIONS,
  filterActivities,
  formatDistance,
  placeActivities,
  type Category,
  type LatLng,
  type RadiusKm,
} from "@/lib/activities";

const ActivityMap = lazy(() => import("@/components/activity-map"));

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de atividades — OFF-LIFE" },
      { name: "description", content: "Atividades presenciais gratuitas perto de você." },
      { property: "og:title", content: "Mapa de atividades — OFF-LIFE" },
      { property: "og:description", content: "Encontre esportes, cultura, educação e projetos sociais por geolocalização." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mapa,
});

type GeoStatus = "loading" | "ok" | "denied" | "unavailable";

function MapPlaceholder({ text = "Carregando mapa…" }: { text?: string }) {
  return <div className="grid h-full w-full place-items-center bg-secondary/40 text-sm text-muted-foreground">{text}</div>;
}

function Meta({ icon: Icon, label, sub }: { icon: typeof MapPin; label: string; sub: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
      <div>
        <div className="font-medium text-foreground">{label}</div>
        <div className="text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function Mapa() {
  const [radius, setRadius] = useState<RadiusKm>(3);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [geo, setGeo] = useState<GeoStatus>("loading");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [joined, setJoined] = useState<string[]>([]);

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeo("unavailable");
      return;
    }
    setGeo("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeo("ok");
      },
      (err) => setGeo(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  useEffect(() => {
    locate();
  }, [locate]);

  const all = useMemo(() => placeActivities(center), [center]);
  const visible = useMemo(() => filterActivities(all, { radiusKm: radius, categories, query }), [all, radius, categories, query]);

  const toggleCategory = (c: Category) => setCategories((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const toggleJoin = (id: string) => setJoined((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="chip">Mapa inteligente</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Atividades gratuitas perto de você</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Geolocalização e instituições parceiras combinadas para recomendar o que faz sentido para o seu perfil.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar atividade ou bairro"
            className="h-12 w-full rounded-full border border-input bg-background pl-11 pr-4 text-sm outline-none focus:border-ring focus:ring-4 focus:ring-ring/20"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3">
        <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Funnel className="h-3.5 w-3.5" /> Distância
        </span>
        {RADIUS_OPTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRadius(r)}
            aria-pressed={radius === r}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              radius === r ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-secondary"
            }`}
          >
            Até {r} km
          </button>
        ))}
        <span className="mx-2 h-5 w-px bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Categorias</span>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => toggleCategory(c)}
            aria-pressed={categories.includes(c)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              categories.includes(c) ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary"
            }`}
          >
            <span className="cat-dot h-2 w-2 rounded-full" data-cat={c} />
            {c}
          </button>
        ))}
      </div>

      {(geo === "denied" || geo === "unavailable") && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
          <span className="text-muted-foreground">
            {geo === "denied"
              ? "Você não liberou a localização. Mostrando atividades perto do centro de Belo Horizonte."
              : "Não conseguimos encontrar sua localização. Mostrando atividades perto do centro de Belo Horizonte."}
          </span>
          <button onClick={locate} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-secondary">
            <LocateFixed className="h-3.5 w-3.5" /> Tentar novamente
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="offlife-map relative isolate h-[480px] overflow-hidden rounded-3xl border border-border bg-secondary/40 soft-shadow lg:sticky lg:top-24 lg:h-[640px]">
          <ClientOnly fallback={<MapPlaceholder />}>
            <Suspense fallback={<MapPlaceholder />}>
              <ActivityMap
                center={center}
                radiusKm={radius}
                activities={visible}
                selectedId={selectedId}
                joined={joined}
                onSelect={setSelectedId}
                onJoin={toggleJoin}
              />
            </Suspense>
          </ClientOnly>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-[1000] flex items-center justify-between rounded-2xl border border-border bg-background/95 px-4 py-3 backdrop-blur">
            <div className="text-xs">
              <div className="font-medium">
                {geo === "ok" ? "Sua localização" : geo === "loading" ? "Buscando sua localização…" : "Centro · Belo Horizonte"}
              </div>
              <div className="text-muted-foreground">Raio até {radius} km</div>
            </div>
            <span className="chip">{visible.length} atividades</span>
          </div>
        </div>

        <div className="space-y-4">
          {visible.length === 0 && (
            <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Nenhuma atividade encontrada nesse raio. Tente aumentar a distância ou mudar as categorias.
            </div>
          )}
          {visible.map((a) => {
            const active = a.id === selectedId;
            const isJoined = joined.includes(a.id);
            return (
              <article
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={`group cursor-pointer rounded-3xl border bg-card p-5 transition md:p-6 ${
                  active ? "border-primary" : "border-border hover:border-clay/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="chip">
                      <span className="cat-dot h-2 w-2 rounded-full" data-cat={a.tag} />
                      {a.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">{a.name}</h3>
                    <div className="mt-1 text-sm text-muted-foreground">{a.org}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-clay text-clay" /> {a.rating}
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs sm:grid-cols-4">
                  <Meta icon={MapPin} label={formatDistance(a.distanceKm)} sub={a.address} />
                  <Meta icon={Clock} label={a.time} sub="Horário" />
                  <Meta icon={Users} label={a.age} sub="Faixa etária" />
                  <div className="sm:text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoin(a.id);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-medium ${
                        isJoined ? "border border-border bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {isJoined ? "Inscrito ✓" : "Participar"}
                    </button>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
