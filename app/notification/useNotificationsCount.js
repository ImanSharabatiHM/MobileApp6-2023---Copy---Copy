import { useContext } from "react";
import NotificationContext from "./notificationContext";

export default useNotificationsCount = () => {
  const { notificationCount, setNotificationCount } = useContext(
    NotificationContext
  );

  return { notificationCount, setNotificationCount };
};
