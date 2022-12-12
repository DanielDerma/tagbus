import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../hook/useAuth";
import useUser from "../hook/useUser";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { logout, currentUser } = useAuth();
  const navigation = useNavigation();
  const { loading } = useUser();

  const handleLogin = async () => {
    await logout();
    navigation.navigate("Profile" as never);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Profile</Text>
      <Text>{currentUser?.email}</Text>
      <Text>{currentUser?.displayName}</Text>
      <Button onPress={handleLogin} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({});
