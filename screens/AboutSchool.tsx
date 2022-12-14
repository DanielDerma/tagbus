import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useUser from "../hook/useUser";

export default function AboutSchool() {
  const { loading } = useUser();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Text>AboutSchool</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
