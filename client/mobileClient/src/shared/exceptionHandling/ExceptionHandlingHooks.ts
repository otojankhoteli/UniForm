import { ApiHookError } from "../../api/shared/ApiHook";
import { useEffect } from "react";

export namespace ExceptionHandlingHooks {
  export function useApiErrorHandling(error: ApiHookError | undefined) {
    useEffect(() => {
      if (!error) {
        return;
      }
      switch (error.statusCode) {
        case 404:
          break;
        case 401:
          //navigate refresh token
          break;
        case 500:
          //navigate to 500 uri
          break;
        default:
          break;
      }
    }, [error]);
  }
}