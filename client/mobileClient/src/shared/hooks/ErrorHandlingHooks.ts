import { ApiHookError } from "../../api/shared/ApiHook";
import { useEffect } from "react";

export default function useErrorHandling(error: ApiHookError) {
  useEffect(() => {
    if (!error) {
      return;
    }
    switch (error.statusCode) {
      case 404:
        break;
      case 401:
        //navigate to login page
        break;
      case 500:
        //navigate to 500 uri
        break;
      default:
        break;
    }
  }, [error]);
}
