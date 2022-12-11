import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../hook/useAuth";
import useUser from "../hook/useUser";

export default function Profile() {
  const { logout } = useAuth();

  const { loading } = useUser();

  const handleSignOut = () => {
    console.log("entre handleSignOut");
    logout();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleSignOut} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({});
