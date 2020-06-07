import { useEffect } from "react";
import { useRefreshToken } from "../../api/auth/AuthApiHook";
import { useGlobalState } from "../globalState/AppContext";
import { navigate } from "../navigation/RootNavigation";
import { JWTExpiredExceptionMessage } from "../../api/shared/ApiConst";

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
    if (!state.exception)
      return;
    console.log("exception", state.exception)
    if (state.exception.type === "ApiError"
      && state.exception.statusCode === 401) {
      if (state.exception.errorObject.message === JWTExpiredExceptionMessage) {
        post({
          expiredToken: state.account.token,
          refreshToken: state.account.refreshToken
        });
      } else {
        navigate("Login");
      }
    }
  }, [state.exception])

}