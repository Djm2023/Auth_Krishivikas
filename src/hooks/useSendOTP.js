import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../api/interceptor";

export const useSendOTP = () =>
  useMutation({
    mutationFn: sendOTP,
  });
