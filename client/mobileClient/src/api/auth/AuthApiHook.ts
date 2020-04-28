import { useEffect } from "react";
import { usePostApi } from "../shared/ApiHook";
import { SignUpRequest, SignUpResponse, RefreshTokenRequest, RefreshTokenResponse } from "./AuthApiModel";
import { SignUpUri, RefreshTokenUri } from "./AuthApiUri";

export function useSignUp() {
  return usePostApi<SignUpRequest, SignUpResponse>(SignUpUri, 'json', false);
}
export function useRefreshToken() {
  return usePostApi<RefreshTokenRequest, RefreshTokenResponse>(RefreshTokenUri, 'json', false);
}

