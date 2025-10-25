import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"; 
// ✅ added: View and Text imported for Navbar

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Navbar / Header section */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Queue App</Text>
      </View>

      {/* ✅ Wrap ScrollView inside another View to avoid overlap */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navbar: {
    backgroundColor: "#0066ff", // ✅ navbar background color
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  navTitle: {
    color: "#ffffff", // ✅ navbar text color
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1, // ✅ ensures ScrollView doesn’t cover the Navbar
  },
  container: {
    padding: 16,
  },
});
