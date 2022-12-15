import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useUser from "../hook/useUser";
import useAuth from "../hook/useAuth";

export default function Notifications() {
  const { infoUser } = useAuth();
  const { loading } = useUser();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>Notifications</Text>
      <Text>{infoUser?.route}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
