import { CurrentHost } from "../shared/ApiUri";

export const SignUpUri = `${CurrentHost}auth/sign`;

export type AuthUriUnion = typeof SignUpUri