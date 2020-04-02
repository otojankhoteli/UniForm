import { AccountState } from "./AppState";


interface SetLoggedInUserAction {
  type: "setLoggedInUser";
  user: AccountState;
}

export type AppAction =
  | SetLoggedInUserAction
