import { useState, useEffect } from "react";
import { getAccount, saveAccount, removeAccount } from "./PersistUtils";
import { PersistAccount } from "./PersistModels";
import { useGlobalState } from "../globalState/AppContext";

const testIntitialState: UseAccountHookState = {
  isLoading: true,
  account: { token: "testToken" } as any,
};
const initialState: UseAccountHookState = { isLoading: true };

export function useAccount(): UseAccountHookState {
  // test args
  const [state, setState] = useState<UseAccountHookState>(initialState);

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    getAccount()
      .then((account) => {
        setState({ isLoading: false, account });
      })
      .finally(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      });
  }, []);

  return { isLoading: state.isLoading, account: state.account };
}

interface UseAccountHookState {
  isLoading: boolean;
  account?: PersistAccount;
}

export function useAccountPersist() {
  const [state] = useGlobalState();

  useEffect(() => {
    if (state.account) {
      saveAccount(state.account);
    } else {
      removeAccount();
    }
  }, [state.account]);
}
