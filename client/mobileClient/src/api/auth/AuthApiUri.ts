import { CurrentHost, IdentityHost } from "../shared/ApiUri";

export const SignUpUri = `${IdentityHost}auth/signup`;
export const RefreshTokenUri = `${IdentityHost}auth/refresh`;

export type AuthUriUnion = typeof SignUpUri;
