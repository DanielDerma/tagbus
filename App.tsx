import "react-native-gesture-handler";

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

// ----------------- Screens -----------------
import Profile from "./screens/Profile";
import NotificationsScreen from "./screens/Notifications";
import AboutSchool from "./screens/AboutSchool";
import TrackerApp from "./screens/TrackerApp";
// Only indexed in the logic of the app, not in the drawer
import Login from "./screens/Login";

// ----------------- Context -----------------
import { AuthProvider } from "./context/AuthCtx";
import useNotifications from "./hook/useNotifications";

const Drawer = createDrawerNavigator();

export default function App() {
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
    useNotifications();

  React.useEffect(() => {
    registerForPushNotificationsAsync();
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
      if (responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen
            name="Login"
            component={Login}
            // options={{
            //   drawerItemStyle: { display: "none" },
            //   headerShown: false,
            //   swipeEnabled: false,
            // }}
          />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Bus Tracker" component={TrackerApp} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="About School" component={AboutSchool} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
