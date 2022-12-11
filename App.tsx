import "react-native-gesture-handler";

import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import AboutSchool from "./screens/AboutSchool";
import Login from "./screens/Login";
import TrackerApp from "./screens/TrackerApp";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Bus Tracker">
        <Drawer.Screen
          name="Home"
          component={Login}
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Bus Tracker" component={TrackerApp} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="About School" component={AboutSchool} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
