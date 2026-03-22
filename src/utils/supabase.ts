import { createClient } from "@supabase/supabase-js";
import {
  ratingKeys,
  ratingMetadata,
  type RatingAverages,
} from "../models/Ratings";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchRatingsPage = async (userId: string, page: number) => {
  const ITEMS_PER_PAGE = 5;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data, count, error } = await supabase
    .from("rating")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    rows: data ?? [],
    totalCount: count ?? 0,
  };
};

export const fetchUserRatingCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from("rating")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
};

export const fetchAverageRatings = async (userId: string) => {
  const selectQuery = ratingKeys.map((key) => `avg_${key}:${key}.avg()`).join();

  const { data, error } = await supabase
    .from("rating")
    .select(selectQuery)
    .eq("user_id", userId)
    .single()
    .overrideTypes<RatingAverages>();

  if (error) {
    throw error;
  }

  return (
    Object.entries(data).map(([k, v]) => ({
      label:
        ratingMetadata.find((x) => x.id === k.replace(/^avg_/, ""))?.label || k,
      score: Number(v).toFixed(2),
    })) ?? []
  );
};

export const deleteAllForUser = async (userId: string | undefined) => {
  const { error } = await supabase
    .from("rating")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
};
