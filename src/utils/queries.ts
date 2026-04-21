import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAverageRatings, fetchRatingsPage } from "./db";

export const useRatingsPage = (page: number) => {
  return useQuery({
    queryKey: ["ratings-page", page],
    queryFn: () => fetchRatingsPage(page),
  });
};

export const useAverageRatings = () => {
  return useQuery({
    queryKey: ["average-ratings"],
    queryFn: () => fetchAverageRatings(),
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
