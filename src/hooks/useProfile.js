import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/interceptor";

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
};
