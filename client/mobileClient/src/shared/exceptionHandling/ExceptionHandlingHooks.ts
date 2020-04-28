import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiHookError } from "../../api/shared/ApiHook";
import { useGlobalState } from "../globalState/AppContext";
import { RootStackParamList } from "../../screens/StartUpScreen";

export function useApiErrorHandling(error: ApiHookError | undefined) {
  const [state, dipatch] = useGlobalState();
  const navigation = useNavigation<StackNavigationProp<
    RootStackParamList
  >>();

  useEffect(() => {
    if (!error) {
      return;
    }
    switch (error.statusCode) {
      case 401:
        if (state && state.account) {
          dipatch({
            type: "refreshAccessToken",
            expiredAccessToken: state.account.token,
            refreshToken: state.account.refreshToken
          });
          break;
        }
        navigation.navigate("Login")
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
  }, [error, state]);
}