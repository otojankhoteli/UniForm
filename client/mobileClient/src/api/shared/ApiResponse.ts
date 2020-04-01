
export interface ApiSuccessResponse<TResult> {
  message: string;
  date: string;
  detail: string;
  isError: boolean;
  createdResult: TResult;
}

export interface ApiErrorResponse {
  message: string;
  date: string;
  detail: string;
  isError: boolean;
  type: "rest";
}

export interface TokenErrorResponse {
  error: string;
  error_description: string;
  type: "token";
}

export interface EmptyResponse {}
export interface EmptyRequest {}

export type ApiErrorUnion = ApiErrorResponse | TokenErrorResponse;

export interface QueryParamsType {
  key: string;
  value: string | number;
}
interface OrderingOption<TViewModel> {
  name: keyof TViewModel;
  ascending: "asc" | "desc";
}
export interface GetRequestInfo<TViewModel> extends PagingOption  {
  orderBy?: OrderingOption<TViewModel>;
  queryParams: QueryParamsType[];
}
export interface PagingOption {
  limit: number;
  offSet: number;
}
