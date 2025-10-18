// app/screens/DashboardScreen.tsx
import React from "react";
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

// Define a type for features to ensure type safety
type Feature = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  screen: string;
};

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  const features: Feature[] = [
    { title: "Finance", icon: "wallet-outline", color: "#27c7d2", screen: "Finance" },
    { title: "Queue", icon: "account-multiple-outline", color: "#666104", screen: "Queue" },
    { title: "Transactions", icon: "file-document-outline", color: "#1976d2", screen: "Transactions" },
    { title: "Queue History", icon: "history", color: "#8e24aa", screen: "QueueHistory" },
    { title: "Analytics", icon: "chart-line", color: "#2e7d32", screen: "Analytics" },
    { title: "Support", icon: "headset", color: "#f57c00", screen: "Support" },
    { title: "Settings", icon: "cog-outline", color: "#546e7a", screen: "Settings" },
  ];

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
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
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
    marginBottom: 30,
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
