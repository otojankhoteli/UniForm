import { usePostApi } from "../shared/ApiHook";
import { SignUpRequest, SignUpResponse } from "./AuthApiModel";
import { SignUpUri } from "./AuthApiUri";

export function useSignUp() {
    return usePostApi<SignUpRequest, SignUpResponse>(SignUpUri, 'json', false);
}