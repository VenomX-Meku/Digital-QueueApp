import React from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert("Logout", "You have logged out successfully!");
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Edit profile feature coming soon!");
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Change password feature coming soon!");
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        style={styles.avatar}
      />

      {/* Profile Info */}
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Email: john@example.com</Text>

      {/* Actions */}
      <View style={styles.buttonSpacing}>
        <Button title="Edit Profile" onPress={handleEditProfile} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  buttonSpacing: {
    marginTop: 10,
    width: "80%",
  },
});
