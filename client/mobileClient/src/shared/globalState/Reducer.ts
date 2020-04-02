import { AppAction } from "./AppAction";
import { State } from "./AppState";

export function reducer(state: State, action: AppAction): State {
  switch (action.type) {
    case "setLoggedInUser":
      return {
        ...state,
        account: action.user
      };
    default:
      return state;
  }
}
