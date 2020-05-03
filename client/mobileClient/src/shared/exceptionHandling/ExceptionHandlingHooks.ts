import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiHookError } from "../../api/shared/ApiHook";
import { useGlobalState } from "../globalState/AppContext";
import { RootStackParamList } from "../../screens/StartUpScreen";
import { navigate } from "../navigation/RootNavigation";

export function useApiErrorHandling(error: ApiHookError | undefined) {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.type === "ApiError") {
      switch (error.statusCode) {
        case 401:
          navigate("Login")
          break;
        case 403:
          break;
        case 404:
          break;
        case 422:
          break;
        case 500:
          break;
        default:
          break;
      }
    }
    console.log("exception",error);
    dispatch({
      type: "setError",
      exception: error
    });
  }, [error]);
}