import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAverageRatings, fetchRatingsPage } from "./supabase";

export const useUserRatingsPage = (
  userId: string | undefined,
  page: number,
) => {
  if (!userId) {
    throw new Error("User ID is required to fetch ratings");
  }

  return useQuery({
    queryKey: ["ratings-page", userId, page],
    queryFn: () => fetchRatingsPage(userId, page),
  });
};

export const useAverageRatings = (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required to fetch average ratings");
  }

  return useQuery({
    queryKey: ["average-ratings", userId],
    queryFn: () => fetchAverageRatings(userId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

export const useRefreshQueries = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: ["ratings-page"],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ["average-ratings"],
    });
  };
};
