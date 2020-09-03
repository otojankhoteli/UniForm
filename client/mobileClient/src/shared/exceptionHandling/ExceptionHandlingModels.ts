import { ApiMethodType } from "../../api/auth/AuthApiModel";
import { ApiErrorResponse } from "../../api/shared/ApiResponse";

export type ApiStatusCode = 200 | 400 | 401 | 403 | 404 | 422 | 500;
interface GoogleSignInException {
  type: "GoogleSignInException";
  message: string;
}
type ExternalApiException = GoogleSignInException;
export type BackendApiException = ApiError | NetworkError;
export interface ApiError {
  uri?: string;
  statusCode?: ApiStatusCode;
  method?: ApiMethodType;
  errorObject: ApiErrorResponse;
  type: "ApiError";
}
export interface NetworkError {
  uri?: string;
  errorObject: any;
  method?: ApiMethodType;
  type: "NetworkError";
}
export type ExceptionState = BackendApiException | ExternalApiException;
