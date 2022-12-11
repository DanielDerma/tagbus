import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useUser from "../hook/useUser";

export default function Notifications() {
  useUser();
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
