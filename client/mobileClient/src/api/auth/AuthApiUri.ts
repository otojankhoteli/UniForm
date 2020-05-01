import { CurrentHost } from "../shared/ApiUri";

export const SignUpUri = `${CurrentHost}auth/signUp`;
export const RefreshTokenUri = `${CurrentHost}auth/refresh`;

export type AuthUriUnion = typeof SignUpUri