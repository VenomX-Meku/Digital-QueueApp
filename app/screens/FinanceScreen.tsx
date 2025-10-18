// app/screens/FinanceScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Dashboard from "../screens/Dashboard"; // import with capital D

export default function FinanceScreen() {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
