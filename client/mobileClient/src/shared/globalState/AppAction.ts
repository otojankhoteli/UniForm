import { ExceptionState } from "../exceptionHandling/ExceptionHandlingModels";
import { PersistAccount } from "../persist/PersistModels";


interface SetErrorAction {
  type: "setError";
  exception: ExceptionState
}

interface SetLoggedInUserAction {
  type: "setLoggedInUser";
  account: PersistAccount;
}

interface UpdateRefreshTokenAction {
  type: "updateRefreshToken";
  accessToken: string;
}

interface RefreshAccessTokenAction {
  type: "refreshAccessToken";
  expiredAccessToken: string;
  refreshToken: string;
}

export type AppAction =
  | SetLoggedInUserAction
  | UpdateRefreshTokenAction
  | SetErrorAction
  | RefreshAccessTokenAction
