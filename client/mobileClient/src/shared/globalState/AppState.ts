import { ExceptionState } from "../exceptionHandling/ExceptionHandlingModels";
import { PersistAccount } from "../persist/PersistModels";

export enum MessageStatus {
  success,
  info,
  warning,
  error
}

interface ToastMessageState {
  messageStatus: MessageStatus;
  text: string;
}

export interface State {
  message?: ToastMessageState;
  account?: PersistAccount;
  exception?: ExceptionState;
}

export const InitialAppState: State = {};

export type ReduxState = State;
