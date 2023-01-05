import "react-native-gesture-handler";

import * as React from "react";

import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation";

// ----------------- Context -----------------
import { AuthProvider } from "./context/AuthCtx";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
