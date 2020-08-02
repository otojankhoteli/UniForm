import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiHookError } from "../../api/shared/ApiHook";
import { useGlobalState } from "../globalState/AppContext";
import { navigate } from "../navigation/RootNavigation";

export function useApiErrorHandling(error: ApiHookError | undefined) {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (!error) {
      return;
    }
    dispatch({
      type: "setError",
      exception: error,
    });
  }, [error]);
}
