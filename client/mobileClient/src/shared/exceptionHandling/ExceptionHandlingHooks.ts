import { ApiHookError } from "../../api/shared/ApiHook";
import { useEffect } from "react";

export function useApiErrorHandling(error: ApiHookError | undefined) {
  useEffect(() => {
    if (!error) {
      return;
    }
    switch (error.statusCode) {
      case 401:
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
  }, [error]);
}