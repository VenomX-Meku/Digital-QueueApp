// app/screens/DashboardScreen.tsx

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ NEW import to remember user role

// ✅ Define type for features
type Feature = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  screen: string;
};

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  // ✅ Role state ("admin" or "user")
  const [role, setRole] = useState<"admin" | "user">("user");

  // ✅ Load user role from AsyncStorage (set during login)
  useEffect(() => {
    const loadRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        if (storedRole === "admin" || storedRole === "user") {
          setRole(storedRole);
        } else {
          setRole("user");
        }
      } catch (error) {
        console.log("Error loading role:", error);
      }
    };
    loadRole();
  }, []);

  // ✅ Save role manually (if needed for testing or login)
  const saveRole = async (newRole: "admin" | "user") => {
    try {
      await AsyncStorage.setItem("userRole", newRole);
      setRole(newRole);
    } catch (error) {
      console.log("Error saving role:", error);
    }
  };

  // ✅ Separate features for admin and user
  const adminFeatures: Feature[] = [
    { title: "Finance", icon: "wallet-outline", color: "#27c7d2", screen: "Finance" },
    { title: "Transactions", icon: "file-document-outline", color: "#1976d2", screen: "Transactions" },
    { title: "Analytics", icon: "chart-line", color: "#2e7d32", screen: "Analytics" },
    { title: "Settings", icon: "cog-outline", color: "#546e7a", screen: "Settings" },
  ];

  const userFeatures: Feature[] = [
    { title: "Queue", icon: "account-multiple-outline", color: "#666104", screen: "Queue" },
    { title: "Queue History", icon: "history", color: "#8e24aa", screen: "QueueHistory" },
    { title: "Support", icon: "headset", color: "#f57c00", screen: "Support" },
    { title: "Profile", icon: "account-outline", color: "#ff4081", screen: "Profile" },
  ];

  // ✅ Merge based on role
  const features: Feature[] =
    role === "admin" ? [...adminFeatures, ...userFeatures] : userFeatures;

  // ✅ UI (kept 100% same)
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1000&q=80",
      }}
      style={styles.bg}
      blurRadius={6}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Digital Queue & Finance App</Text>
          <Text style={styles.subtitle}>Smart. Fast. Efficient.</Text>

          {/* ✅ NEW: Display current role */}
          <Text style={styles.roleText}>Current Role: {role.toUpperCase()}</Text>

          {/* ✅ Optional: Switch role manually (for testing) */}
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => saveRole(role === "admin" ? "user" : "admin")}
          >
            <Text style={styles.switchButtonText}>
              Switch to {role === "admin" ? "User" : "Admin"}
            </Text>
          </TouchableOpacity>

          {/* Existing feature grid (unchanged) */}
          <View style={styles.grid}>
            {features.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={32}
                  color="#fff"
                />
                <Text style={styles.cardText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footer}>🚀 Empowering your workflow daily</Text>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#b2ebf2",
    fontSize: 16,
    marginBottom: 10,
  },
  roleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: "#27c7d2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  switchButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: 140,
    height: 120,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  cardText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },
  footer: {
    color: "#ccc",
    marginTop: 40,
    fontStyle: "italic",
  },
});
