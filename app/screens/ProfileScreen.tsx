import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function ProfileScreen() {
  const handleLogout = () => Alert.alert("Logout", "You have logged out successfully!");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text>Name: John Doe</Text>
      <Text>Email: john@example.com</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
