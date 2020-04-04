import { useState, useEffect } from "react";
import { getAccount } from "./PersistUtils";
import { PersistAccount } from "./PersistModels";

export function useAccount(): UseAccountHookState {
  // test args
  const [state, setState] = useState<UseAccountHookState>({ isLoading: true, account: { token: "testToken" } as any });

  useEffect(() => {
    setState(prev=>({...prev, isLoading: true }));
    getAccount()
      .then(account => {
        // setState({ isLoading: false, account });
      })
      .finally(() => {
        setState(prev => ({ ...prev, isLoading: false }));
      });
  }, []);


  return { isLoading: state.isLoading, account: state.account }
}

interface UseAccountHookState {
  isLoading: boolean;
  account?: PersistAccount;
}
