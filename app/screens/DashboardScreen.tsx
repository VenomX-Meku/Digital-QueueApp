// app/screens/DashboardScreen.tsx
import React from "react";
import { ScrollView, Text, Button, StyleSheet } from "react-native";

export default function DashboardScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Digital Queue & Finance App</Text>

      <Button title="Go to Finance" onPress={() => navigation.navigate("Finance")} />
      <Button title="Go to Queue" onPress={() => navigation.navigate("Queue")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Transactions" onPress={() => navigation.navigate("Transactions")} />
      <Button title="Queue History" onPress={() => navigation.navigate("QueueHistory")} />
      <Button title="Analytics" onPress={() => navigation.navigate("Analytics")} />
      <Button title="Support" onPress={() => navigation.navigate("Support")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
});
