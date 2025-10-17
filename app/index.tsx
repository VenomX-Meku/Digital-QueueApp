import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QueueScreen from "./queue";

export default function QueueIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Queue Management</Text>
      <QueueScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
});
