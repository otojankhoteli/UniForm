import { AppAction } from "./AppAction";
import { State } from "./AppState";

export function reducer(state: State, action: AppAction): State {
  switch (action.type) {
    case "setLoggedInUser":
      return {
        ...state,
        account: action.account
      };
    case "setError":
      return {
        ...state,
        exception: action.exception
      };
    case "updateRefreshToken":
      return {
        ...state,
        account: { ...state.account, token: action.accessToken }
      };
    default:
      return state;
  }
}
