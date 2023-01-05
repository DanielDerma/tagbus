import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { updateToken } from "../services/firebaseFunctions";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firestore } from "../services/client";
import type { UserInfo } from "firebase/auth";
import type { NotificationType, UserInfoType } from "../types";

const useNotifications = (
  currentUser: UserInfo | null | undefined,
  infoUser: UserInfoType | null | undefined
) => {
  const [notifications, setNotifications] = useState<NotificationType[]>();

  useEffect(() => {
    if (!currentUser || !infoUser) return;

    const q = query(
      collection(firestore, "notifications"),
      where("route", "==", infoUser.route)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const notification: NotificationType = {
          id: doc.id,
          title: data.title,
          body: data.body,
          route: data.route,
          createdAt: data.createdAt.toDate(),
        };
        return notification;
      });
      setNotifications(data);
    });

    registerForPushNotificationsAsync(currentUser.uid);
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      unsubscribe;
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    };
  }, [currentUser, infoUser]);

  const registerForPushNotificationsAsync = async (uid: string) => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await updateToken(uid, token);
    }
    // else {
    //   alert("Must use physical device for Push Notifications");
    // }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const handleNotifications = (notification: Notifications.Notification) => {};

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data = response.notification.request.content.data;
    console.log(data);
  };

  return {
    notifications,
  };
};

export default useNotifications;
