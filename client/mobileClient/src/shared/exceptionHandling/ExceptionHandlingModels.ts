import { ApiMethodType } from "../../api/auth/AuthApiModel";

interface GoogleSignInException {
  type: "GoogleSignInException",
  message: string;
}
type ExternalApiException = GoogleSignInException;
interface BackendApiException {
  url: string;
  methodType: ApiMethodType;
  type: "BackendApiException";
}
export type ExceptionState = BackendApiException | ExternalApiException;