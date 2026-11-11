import { describe, expect, it } from "vitest";
import { DEFAULT_CENTER, destinationPoint, filterActivities, formatDistance, haversineKm, placeActivities } from "@/lib/activities";

describe("activity geo rules", () => {
  it("measures real distance with Haversine (Praça da Liberdade → Praça Sete ≈ 1.6 km)", () => {
    const d = haversineKm({ lat: -19.932, lng: -43.938 }, { lat: -19.9191, lng: -43.9386 });
    expect(d).toBeGreaterThan(1.3);
    expect(d).toBeLessThan(1.6);
  });

  it("places a point at the requested distance", () => {
    const p = destinationPoint(DEFAULT_CENTER, 90, 3);
    expect(haversineKm(DEFAULT_CENTER, p)).toBeCloseTo(3, 3);
  });

  it("only shows activities inside the 1 km radius", () => {
    const list = filterActivities(placeActivities(DEFAULT_CENTER), { radiusKm: 1, categories: [], query: "" });
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((a) => a.distanceKm <= 1)).toBe(true);
  });

  it("shows more activities as the radius grows from 1 to 3 to 5 km", () => {
    const all = placeActivities(DEFAULT_CENTER);
    const n = (r: number) => filterActivities(all, { radiusKm: r, categories: [], query: "" }).length;
    expect(n(1)).toBeLessThan(n(3));
    expect(n(3)).toBeLessThan(n(5));
  });

  it("formats distances like the site (480 m / 1,2 km)", () => {
    expect(formatDistance(0.48)).toBe("480 m");
    expect(formatDistance(1.23)).toBe("1,2 km");
  });
});
