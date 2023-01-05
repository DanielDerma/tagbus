import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import * as Notifications from "expo-notifications";

// ----------------- Screens -----------------
import Profile from "../screens/Profile";
import NotificationsScreen from "../screens/Notifications";
import AboutSchool from "../screens/AboutSchool";
import TrackerApp from "../screens/TrackerApp";
// Only indexed in the logic of the app, not in the drawer
import Login from "../screens/Login";

import useNotifications from "../hook/useNotifications";
import useAuth from "../hook/useAuth";

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { infoUser, currentUser } = useAuth();

  const { notifications } = useNotifications(currentUser, infoUser);
  console.log({ notifications });

  return (
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
  );
};

export default Navigation;
