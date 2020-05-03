import { useEffect } from "react";
import { useRefreshToken } from "../../api/auth/AuthApiHook";
import { useGlobalState } from "../globalState/AppContext";
import { navigate } from "../navigation/RootNavigation";

export function useTokenRefreshHandler() {
  const { post, result, isError } = useRefreshToken();
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    if (!result) {
      return;
    }
    if (isError) {
      navigate("Login")
    } else {
      console.log("refresh token updated");
      dispatch({
        type: "updateRefreshToken",
        accessToken: result.token
      });
    }
  }, [result, isError]);

  useEffect(() => {
    if (state.exception) {
      if (state.exception.type === "ApiError" && state.exception.statusCode === 401) {
        console.log("refres token")
        post({
          expiredToken: state.account.token,
          refreshToken: state.account.refreshToken
        });
      }
    }
  }, [state.exception])

}