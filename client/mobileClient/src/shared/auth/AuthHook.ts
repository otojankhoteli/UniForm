import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRefreshToken } from "../../api/auth/AuthApiHook";
import { RootStackParamList } from "../../screens/StartUpScreen";
import { useGlobalState } from "../globalState/AppContext";

export function useTokenRefreshHandler() {
  const { post, result, isError } = useRefreshToken();
  const [state, dispatch] = useGlobalState();
  const navigation = useNavigation<StackNavigationProp<
    RootStackParamList
  >>();

  useEffect(() => {
    if (!result) {
      return;
    }
    if (isError) {
      navigation.navigate("Login")
    } else {
      dispatch({
        type: "updateRefreshToken",
        accessToken: result.token
      });
    }
  }, [result, isError])

  useEffect(() => {
    if (state.account.token && state.account.refreshToken) {
      post({
        expiredToken: state.account.token,
        refreshToken: state.account.refreshToken
      })
    }
  }, [state.account && state.account.refreshToken, state.account && state.account.token])
}