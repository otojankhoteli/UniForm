import { CurrentHost } from "../shared/ApiUri";

export const AuthUri = `${CurrentHost}token`;

export type AuthUriUnion = typeof AuthUri