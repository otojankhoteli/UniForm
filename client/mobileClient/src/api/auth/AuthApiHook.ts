import { usePostApi } from "../shared/ApiHook";
import { AuthRequest, AuthResponse } from "./AuthApiModel";
import { AuthUri } from "./AuthApiUri";

export function useAuth() {
    return usePostApi<AuthRequest, AuthResponse>(AuthUri, 'json', false);
}