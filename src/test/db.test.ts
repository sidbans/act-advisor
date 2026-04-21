import { describe, it, expect, beforeEach } from "vitest";
import {
  db,
  addRating,
  fetchRatingsPage,
  fetchAverageRatings,
  deleteAllRatings,
  exportRatings,
  importRatings,
  type RatingRecord,
} from "../utils/db";
import type { RatingsData } from "../models/Ratings";

const makeRating = (overrides: Partial<RatingsData> = {}): RatingsData => ({
  present_moment: 5,
  values: 5,
  committed_action: 5,
  self_context: 5,
  defusion: 5,
  acceptance: 5,
  ...overrides,
});

beforeEach(async () => {
  await db.ratings.clear();
});

describe("addRating", () => {
  it("inserts a rating with auto-generated created_at", async () => {
    await addRating(makeRating({ present_moment: 8 }));

    const all = await db.ratings.toArray();
    expect(all).toHaveLength(1);
    expect(all[0].present_moment).toBe(8);
    expect(new Date(all[0].created_at).getTime()).not.toBeNaN();
  });
});

describe("fetchRatingsPage", () => {
  it("returns empty when no data exists", async () => {
    const result = await fetchRatingsPage(1);
    expect(result.rows).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });

  it("paginates at 5 items per page", async () => {
    for (let i = 0; i < 7; i++) {
      await db.ratings.add({
        ...makeRating(),
        created_at: new Date(2025, 0, i + 1).toISOString(),
      });
    }

    const page1 = await fetchRatingsPage(1);
    expect(page1.rows).toHaveLength(5);
    expect(page1.totalCount).toBe(7);

    const page2 = await fetchRatingsPage(2);
    expect(page2.rows).toHaveLength(2);
  });

  it("returns newest first", async () => {
    await db.ratings.add({ ...makeRating({ present_moment: 1 }), created_at: "2025-01-01T00:00:00Z" });
    await db.ratings.add({ ...makeRating({ present_moment: 9 }), created_at: "2025-06-01T00:00:00Z" });

    const { rows } = await fetchRatingsPage(1);
    expect(rows[0].present_moment).toBe(9);
    expect(rows[1].present_moment).toBe(1);
  });
});

describe("fetchAverageRatings", () => {
  it("returns [] when empty", async () => {
    expect(await fetchAverageRatings()).toEqual([]);
  });

  it("computes correct averages", async () => {
    await db.ratings.add({ ...makeRating({ present_moment: 2, values: 8 }), created_at: new Date().toISOString() });
    await db.ratings.add({ ...makeRating({ present_moment: 6, values: 4 }), created_at: new Date().toISOString() });

    const result = await fetchAverageRatings();
    expect(result.find((r) => r.label === "Present Moment")?.score).toBe("4.00");
    expect(result.find((r) => r.label === "Values")?.score).toBe("6.00");
  });

  it("returns all 6 labels", async () => {
    await db.ratings.add({ ...makeRating(), created_at: new Date().toISOString() });
    expect(await fetchAverageRatings()).toHaveLength(6);
  });
});

describe("deleteAllRatings", () => {
  it("clears all data", async () => {
    await addRating(makeRating());
    await addRating(makeRating());
    await deleteAllRatings();
    expect(await db.ratings.count()).toBe(0);
  });
});

describe("export / import", () => {
  it("exports all ratings", async () => {
    await addRating(makeRating({ present_moment: 3 }));
    await addRating(makeRating({ present_moment: 7 }));
    const exported = await exportRatings();
    expect(exported).toHaveLength(2);
  });

  it("imports with new ids and merges", async () => {
    await addRating(makeRating());

    const data: RatingRecord[] = [
      { id: 999, ...makeRating({ present_moment: 1 }), created_at: "2025-01-01T00:00:00Z" },
    ];
    await importRatings(data);

    const all = await db.ratings.toArray();
    expect(all).toHaveLength(2);
    expect(all.every((r) => r.id !== 999)).toBe(true);
  });

  it("round-trips data correctly", async () => {
    await addRating(makeRating({ present_moment: 3 }));
    await addRating(makeRating({ present_moment: 9 }));

    const exported = await exportRatings();
    await deleteAllRatings();
    await importRatings(exported);

    const all = await db.ratings.toArray();
    expect(all).toHaveLength(2);
    expect(all.map((r) => r.present_moment).sort()).toEqual([3, 9]);
  });
});
