import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Constants from "expo-constants";
import useAuth from "../hook/useAuth";
import useUser from "../hook/useUser";

export default function Login() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useUser(true);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("Profile" as never);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleLogin} title="Login" />
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
