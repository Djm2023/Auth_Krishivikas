import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/interceptor";

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
  });
