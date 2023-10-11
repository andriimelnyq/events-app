import React, { useMemo, useState } from "react";
import { NotificationText } from "../types/NotificationText";

interface Notification {
  text: NotificationText;
  severity: "error" | "warning" | "info" | "success";
}

interface NotificationContextType {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
}

export const NotificationContext = React.createContext<NotificationContextType>(
  {
    notification: null,
    setNotification: () => {},
  },
);

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const NotificationContextValues = useMemo(
    () => ({
      notification,
      setNotification,
    }),
    [notification],
  );

  return (
    <NotificationContext.Provider value={NotificationContextValues}>
      {children}
    </NotificationContext.Provider>
  );
};
