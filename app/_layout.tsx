import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
