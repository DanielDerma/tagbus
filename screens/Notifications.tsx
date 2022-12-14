import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useUser from "../hook/useUser";

export default function Notifications() {
  const { loading } = useUser();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
