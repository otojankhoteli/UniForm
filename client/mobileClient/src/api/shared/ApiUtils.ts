import { ApiBodyType } from "./ApiHook";
import { ApiErrorUnion, ApiErrorResponse, TokenErrorResponse, QueryParamsType, GetRequestInfo } from "./ApiResponse";
import { AsyncStorage } from "react-native";

export function getEncodedUri<TRequest>(requestBody: TRequest) {
  return Object.keys(requestBody)
    .map(key => {
      return (
        encodeURIComponent(key) + "=" + encodeURIComponent(requestBody[key])
      );
    })
    .join("&");
}

export function getWithAuthorizeHeader(headers: HeadersInit, affect = true) {
  const loggedIn = isLoggedIn();
  if (loggedIn && affect) {
    return Object.assign(headers, { Authorization: `bearer ${getToken()}` });
  }
  return headers;
}

export async function PersistLoggedInUserInStorage(loggedInUser: any) {
  try {
    await AsyncStorage.setItem("User", JSON.stringify(loggedInUser));
  } catch (error) {
    console.log("error", error);
    // Error saving data
  }
}

export function isLoggedIn(): boolean {
  return true;
}

export function getToken(): string {
  return 'token'
}

export function getBodyAndHeaderFromType<TRequest>(
  apiBodyType: ApiBodyType,
  request: TRequest
): [HeadersInit, BodyInit] {
  let headers: HeadersInit = {} as any;
  let body: BodyInit = {} as any;

  switch (apiBodyType) {
    case "json":
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(request);
      break;
    case "urlencoded":
      headers = { "Content-Type": "application/x-www-form-urlencoded" };
      body = getEncodedUri(request);
      break;
    case "multipart":
      const data = new FormData();
      data.append("file", request as any);
      body = data;
      break;
    default:
      break;
  }

  return [headers, body];
}

export function getUri<TResponseViewModel>(
  uri: string,
  request: GetRequestInfo<TResponseViewModel>
) {
  let queries = generateQueryParamString(request.queryParams);
  if (queries) {
    queries += "&";
  }
  let paged = `${uri}?${queries}offSet=${request.offSet}&limit=${request.limit}`;
  if (request.orderBy) {
    paged = `${paged}&orderBy=${request.orderBy.name} ${request.orderBy.ascending}`;
  }

  return encodeURI(paged);
}

export function getUriFromQueryObject<TRequest>(
  uri: string,
  request: TRequest
) {
  let queries = generateQueryParamStringFromObject(request);
  if (queries) {
    return `${uri}?${queries}`;
  }

  return uri;
}

export function generateQueryParamStringFromObject<TRequest>(object: TRequest) {
  return generateQueryParamString(
    Object.entries(object).map<QueryParamsType>(([key, value]) => {
      return {
        key,
        value
      };
    })
  );
}

export function generateQueryParamString(queryParams: QueryParamsType[]) {
  return queryParams.reduce((prev, cur) => {
    if (!cur.value) {
      return prev;
    }

    if (prev == "") {
      return `${cur.key}=${cur.value}`;
    }
    return `${prev}&${cur.key}=${cur.value}`;
  }, "");
}
