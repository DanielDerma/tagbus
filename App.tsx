import "react-native-gesture-handler";

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// ----------------- Screens -----------------
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import AboutSchool from "./screens/AboutSchool";
import TrackerApp from "./screens/TrackerApp";
// Only indexed in the logic of the app, not in the drawer
import Login from "./screens/Login";

// ----------------- Context -----------------
import { AuthProvider } from "./context/AuthCtx";

const Drawer = createDrawerNavigator();

export default function App() {
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
          <Drawer.Screen name="Notifications" component={Notifications} />
          <Drawer.Screen name="About School" component={AboutSchool} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
