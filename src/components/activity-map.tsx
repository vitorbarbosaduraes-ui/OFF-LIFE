// Browser-only: imports Leaflet. Load with React.lazy behind <ClientOnly>.
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { formatDistance, type Activity, type LatLng } from "@/lib/activities";

const INITIALS: Record<Activity["tag"], string> = {
  Esportes: "ES",
  Cultura: "CU",
  Educação: "ED",
  Lazer: "LZ",
  "Projetos Sociais": "PS",
};

function pinIcon(a: Activity, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="map-pin" data-cat="${a.tag}" data-active="${active}"><span>${INITIALS[a.tag]}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 41],
    popupAnchor: [0, -40],
  });
}

const userIcon = L.divIcon({ className: "", html: `<div class="user-dot"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] });

function FitRadius({ center, radiusKm }: { center: LatLng; radiusKm: number }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLng(center.lat, center.lng).toBounds(radiusKm * 2000);
    map.flyToBounds(bounds, { padding: [24, 24], duration: 0.6 });
  }, [map, center.lat, center.lng, radiusKm]);
  return null;
}

function FocusSelected({ activity, markers }: { activity: Activity | null; markers: React.MutableRefObject<Record<string, L.Marker | null>> }) {
  const map = useMap();
  useEffect(() => {
    if (!activity) return;
    const marker = markers.current[activity.id];
    map.flyTo([activity.lat, activity.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
    const t = setTimeout(() => marker?.openPopup(), 650);
    return () => clearTimeout(t);
  }, [map, activity, markers]);
  return null;
}

type Props = {
  center: LatLng;
  radiusKm: number;
  activities: Activity[];
  selectedId: string | null;
  joined: string[];
  onSelect: (id: string) => void;
  onJoin: (id: string) => void;
};

export default function ActivityMap({ center, radiusKm, activities, selectedId, joined, onSelect, onJoin }: Props) {
  const markers = useRef<Record<string, L.Marker | null>>({});
  const selected = useMemo(() => activities.find((a) => a.id === selectedId) ?? null, [activities, selectedId]);

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={14} scrollWheelZoom className="h-full w-full" zoomControl>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitRadius center={center} radiusKm={radiusKm} />
      <FocusSelected activity={selected} markers={markers} />

      <Circle
        center={[center.lat, center.lng]}
        radius={radiusKm * 1000}
        pathOptions={{ className: "radius-circle", dashArray: "8 10", weight: 2, fillOpacity: 0.07 }}
      />

      <Marker position={[center.lat, center.lng]} icon={userIcon} zIndexOffset={1000}>
        <Popup>
          <div className="p-4 text-sm font-medium">Você está aqui</div>
        </Popup>
      </Marker>

      {activities.map((a) => {
        const isJoined = joined.includes(a.id);
        return (
          <Marker
            key={a.id}
            position={[a.lat, a.lng]}
            icon={pinIcon(a, a.id === selectedId)}
            ref={(m) => {
              markers.current[a.id] = m;
            }}
            eventHandlers={{ click: () => onSelect(a.id) }}
          >
            <Popup>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="chip">
                    <span className="cat-dot h-2 w-2 rounded-full" data-cat={a.tag} />
                    {a.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Star className="h-3.5 w-3.5 fill-clay text-clay" /> {a.rating}
                  </span>
                </div>
                <div className="mt-2 font-display text-xl leading-tight">{a.name}</div>
                <div className="text-xs text-muted-foreground">{a.org}</div>
                <ul className="mt-3 space-y-1.5 text-xs">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      <strong className="font-medium">a {formatDistance(a.distanceKm)} de você</strong> · {a.address}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {a.time}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> {a.age}
                  </li>
                </ul>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
                  <span className="text-xs font-semibold text-clay">Gratuito</span>
                  <button
                    onClick={() => onJoin(a.id)}
                    className={`rounded-full px-4 py-2 text-xs font-medium ${
                      isJoined ? "border border-border bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {isJoined ? "Inscrito ✓" : "Inscrever-se"}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
