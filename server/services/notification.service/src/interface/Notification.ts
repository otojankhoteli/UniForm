export interface INotification {
  _id: string,
  type: string,
  from: {
    _id: string,
    name: string,
  },
  to: {
    _id: string,
    name: string,
    deviceId: string,
  },
  where: {
    _id: string,
    text?: string,
  },
  etc?: any,
}
