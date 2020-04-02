import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  Reducer
} from "react";
import { InitialAppState, State } from "./AppState";
import { AppAction } from "./AppAction";

type AppState = [State, Dispatch<AppAction>];

const AppContext = createContext<AppState>([InitialAppState, () => {}]);

const StateProvider = ({
  reducer,
  initialState,
  children
}: {
  reducer: Reducer<State, any>;
  initialState: State;
  children: any;
}) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalState = () => {
  return useContext(AppContext);
};

export { AppContext, InitialAppState, StateProvider, useGlobalState };
