// Browser-safe activity data and geo helpers (no Leaflet imports here).

export type Category = "Esportes" | "Cultura" | "Educação" | "Lazer" | "Projetos Sociais";

export const CATEGORIES: Category[] = ["Esportes", "Cultura", "Educação", "Lazer", "Projetos Sociais"];

export const RADIUS_OPTIONS = [1, 3, 5] as const;
export type RadiusKm = (typeof RADIUS_OPTIONS)[number];

export type LatLng = { lat: number; lng: number };

/** Fallback when the browser can't share the location: Praça da Liberdade, Belo Horizonte. */
export const DEFAULT_CENTER: LatLng = { lat: -19.932, lng: -43.938 };

type ActivitySeed = {
  id: string;
  name: string;
  org: string;
  address: string;
  time: string;
  age: string;
  rating: number;
  tag: Category;
  /** Demo placement around the user: compass bearing (deg) and distance (km). */
  bearing: number;
  offsetKm: number;
};

export const ACTIVITY_SEEDS: ActivitySeed[] = [
  { id: "futsal", name: "Escolinha de Futsal Comunitária", org: "Centro Esportivo Vila Nova", address: "R. das Acácias, 122", time: "Ter e Qui · 18h", age: "12–17 anos", rating: 4.8, tag: "Esportes", bearing: 40, offsetKm: 0.4 },
  { id: "leitura", name: "Clube de Leitura Jovem", org: "Biblioteca Municipal", address: "Av. Central, 540", time: "Sáb · 10h", age: "13–19 anos", rating: 4.9, tag: "Cultura", bearing: 200, offsetKm: 0.8 },
  { id: "robotica", name: "Robótica para Iniciantes", org: "Escola Estadual Central", address: "R. dos Inventores, 77", time: "Seg · 15h", age: "11–16 anos", rating: 4.7, tag: "Educação", bearing: 300, offsetKm: 0.9 },
  { id: "teatro", name: "Oficina de Teatro", org: "Casa de Cultura", address: "R. Paulo Afonso, 88", time: "Sex · 17h", age: "14–18 anos", rating: 4.7, tag: "Cultura", bearing: 110, offsetKm: 1.2 },
  { id: "programacao", name: "Curso Gratuito de Programação", org: "Hub Educacional", address: "R. das Palmeiras, 25", time: "Qua · 19h", age: "15–24 anos", rating: 4.9, tag: "Educação", bearing: 330, offsetKm: 1.9 },
  { id: "xadrez", name: "Torneio de Xadrez", org: "Centro Comunitário Sul", address: "Pç. da Matriz, s/n", time: "Dom · 9h", age: "12+", rating: 4.6, tag: "Lazer", bearing: 170, offsetKm: 2.3 },
  { id: "volei", name: "Vôlei de Quadra Aberto", org: "Ginásio Bela Vista", address: "Av. das Américas, 1.020", time: "Sáb · 15h", age: "13–20 anos", rating: 4.5, tag: "Esportes", bearing: 260, offsetKm: 2.7 },
  { id: "mutirao", name: "Projeto Verde — Mutirão Ambiental", org: "ONG Raízes", address: "Parque das Águas", time: "Sáb · 8h", age: "Todos", rating: 4.8, tag: "Projetos Sociais", bearing: 70, offsetKm: 3.5 },
  { id: "grafite", name: "Oficina de Grafite", org: "Coletivo Muros Vivos", address: "R. do Viaduto, 300", time: "Qui · 16h", age: "14–21 anos", rating: 4.7, tag: "Cultura", bearing: 20, offsetKm: 4.4 },
  { id: "horta", name: "Horta Comunitária Jovem", org: "Associação de Moradores", address: "R. das Hortênsias, 15", time: "Dom · 8h", age: "Todos", rating: 4.9, tag: "Projetos Sociais", bearing: 230, offsetKm: 4.8 },
];

export type Activity = Omit<ActivitySeed, "bearing" | "offsetKm"> & LatLng & { distanceKm: number };

const EARTH_RADIUS_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

/** Great-circle distance between two points in km (Haversine). */
export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Point reached by travelling `km` from `origin` along `bearingDeg`. */
export function destinationPoint(origin: LatLng, bearingDeg: number, km: number): LatLng {
  const δ = km / EARTH_RADIUS_KM;
  const θ = toRad(bearingDeg);
  const φ1 = toRad(origin.lat);
  const λ1 = toRad(origin.lng);
  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
  const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
  return { lat: toDeg(φ2), lng: ((toDeg(λ2) + 540) % 360) - 180 };
}

/** Places the demo activities around `center` and measures each distance. */
export function placeActivities(center: LatLng, seeds: ActivitySeed[] = ACTIVITY_SEEDS): Activity[] {
  return seeds.map(({ bearing, offsetKm, ...rest }) => {
    const pos = destinationPoint(center, bearing, offsetKm);
    return { ...rest, ...pos, distanceKm: haversineKm(center, pos) };
  });
}

export type ActivityFilter = { radiusKm: number; categories: Category[]; query: string };

/** Activities inside the radius, matching categories (none = all) and search text, nearest first. */
export function filterActivities(list: Activity[], { radiusKm, categories, query }: ActivityFilter): Activity[] {
  const q = query.trim().toLocaleLowerCase("pt-BR");
  return list
    .filter((a) => a.distanceKm <= radiusKm + 1e-9)
    .filter((a) => categories.length === 0 || categories.includes(a.tag))
    .filter((a) => !q || [a.name, a.org, a.address, a.tag].some((f) => f.toLocaleLowerCase("pt-BR").includes(q)))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/** "480 m" under 1 km, otherwise "1,2 km". */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round((km * 1000) / 10) * 10} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}
