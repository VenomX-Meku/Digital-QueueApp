// app/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Example of real user/admin credentials
  const mockUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "user123", role: "user" },
    { username: "user2", password: "pass123", role: "user" },
  ];

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    // ✅ Find user in mock database
    const foundUser = mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      Alert.alert("Error", "Invalid username or password");
      return;
    }

    try {
      // ✅ Save role to AsyncStorage
      await AsyncStorage.setItem("userRole", foundUser.role);

      // ✅ Navigate based on role
      if (foundUser.role === "admin") navigation.replace("AdminDashboard");
      else navigation.replace("Dashboard");
    } catch (error) {
      console.log("Error saving role:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#27c7d2", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
  



