import { useEffect } from "react";

const useNotification = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (title: string, body: string) => {
    if (
      typeof window !== "undefined" &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
      });
    }
  };

  return {
    sendNotification,
  };
};

export default useNotification;
