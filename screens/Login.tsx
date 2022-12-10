import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        onPress={() => navigation.navigate("Bus Tracker")}
        title="Go to notifications"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 10,
  },
});
