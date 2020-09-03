import { NotificationViewModel } from "./NotificationsApiModel";
import { NotificationsUri } from "./NotificationsApiUri";
import { useGetApi } from "../shared/ApiHook";

export function useGetNotifications() {
  return useGetApi<NotificationViewModel[], NotificationViewModel>(
    NotificationsUri,
    true,
    {
      wait: false,
      info: {
        limit: 0,
        queryParams: [],
        skip: 0,
      },
    }
  );
}
