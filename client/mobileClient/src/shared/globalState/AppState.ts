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

export interface AccountState {
  id: string;
  deviceId: string;
  username: string;
  token: string;
}


export interface State {
  message?: ToastMessageState;
  account?: AccountState;
}

export const InitialAppState: State = {
};

export type ReduxState = State;
