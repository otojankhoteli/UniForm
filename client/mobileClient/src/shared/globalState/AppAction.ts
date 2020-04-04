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

export type AppAction =
  | SetLoggedInUserAction
  | SetErrorAction
