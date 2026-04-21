import Dexie, { type EntityTable } from "dexie";
import {
  ratingKeys,
  ratingMetadata,
  type RatingsData,
} from "../models/Ratings";

export type RatingRecord = RatingsData & {
  id?: number;
  created_at: string;
};

export const db = new Dexie("act-advisor") as Dexie & {
  ratings: EntityTable<RatingRecord, "id">;
};

db.version(1).stores({
  ratings: "++id, created_at",
});

const ITEMS_PER_PAGE = 5;

export const addRating = async (data: RatingsData) => {
  await db.ratings.add({
    ...data,
    created_at: new Date().toISOString(),
  });
};

export const fetchRatingsPage = async (page: number) => {
  const totalCount = await db.ratings.count();
  const from = (page - 1) * ITEMS_PER_PAGE;

  const rows = await db.ratings
    .orderBy("created_at")
    .reverse()
    .offset(from)
    .limit(ITEMS_PER_PAGE)
    .toArray();

  return { rows, totalCount };
};

export const fetchAverageRatings = async () => {
  const ratings = await db.ratings.toArray();

  if (ratings.length === 0) return [];

  const sums = Object.fromEntries(ratingKeys.map((k) => [k, 0]));
  for (const row of ratings) {
    for (const k of ratingKeys) {
      sums[k] += row[k];
    }
  }

  return ratingKeys.map((k) => ({
    label: ratingMetadata.find((m) => m.id === k)?.label || k,
    score: (sums[k] / ratings.length).toFixed(2),
  }));
};

export const deleteAllRatings = async () => {
  await db.ratings.clear();
};

export const exportRatings = async (): Promise<RatingRecord[]> => {
  return db.ratings.toArray();
};

export const importRatings = async (data: RatingRecord[]) => {
  // Strip any `id` fields so Dexie auto-assigns new ones
  const cleaned = data.map(({ id: _id, ...rest }) => rest);
  await db.ratings.bulkAdd(cleaned as RatingRecord[]);
};
