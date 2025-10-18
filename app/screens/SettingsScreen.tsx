// app/screens/SettingsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SettingItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  type: "toggle" | "navigation" | "action";
  value?: boolean;
  actionDetail?: string;
};

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SettingItem | null>(null);
  const [settingsState, setSettingsState] = useState<Record<number, boolean>>({
    1: true, // Notifications
    2: false, // Dark Mode
  });

  const settings: SettingItem[] = [
    {
      id: 1,
      title: "Enable Notifications",
      description: "Receive updates about your queue and offers.",
      icon: "bell-ring-outline",
      type: "toggle",
      value: true,
    },
    {
      id: 2,
      title: "Dark Mode",
      description: "Use dark theme for better night experience.",
      icon: "weather-night",
      type: "toggle",
      value: false,
    },
    {
      id: 3,
      title: "Account Info",
      description: "Manage your personal account information.",
      icon: "account-circle-outline",
      type: "navigation",
    },
    {
      id: 4,
      title: "Payment Methods",
      description: "Add, edit, or remove saved payment methods.",
      icon: "credit-card-outline",
      type: "navigation",
    },
    {
      id: 5,
      title: "Support & FAQ",
      description: "Get help and answers to common questions.",
      icon: "lifebuoy",
      type: "navigation",
    },
    {
      id: 6,
      title: "Clear Cache",
      description: "Free up space by clearing temporary app data.",
      icon: "delete-outline",
      type: "action",
      actionDetail: "Are you sure you want to clear the app cache?",
    },
    {
      id: 7,
      title: "Logout",
      description: "Sign out of your account safely.",
      icon: "logout",
      type: "action",
      actionDetail: "Do you really want to logout?",
    },
  ];

  const toggleSwitch = (id: number) => {
    setSettingsState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (item: SettingItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings & Preferences</Text>

      {settings.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color="#fff"
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          </View>

          {item.type === "toggle" && (
            <Switch
              value={settingsState[item.id]}
              onValueChange={() => toggleSwitch(item.id)}
              trackColor={{ false: "#b0bec5", true: "#4db6ac" }}
              thumbColor={settingsState[item.id] ? "#00796b" : "#eceff1"}
            />
          )}

          {(item.type === "action" || item.type === "navigation") && (
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => openModal(item)}
            >
              <MaterialCommunityIcons name="chevron-right" size={28} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Modal for actions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalDetail}>
              {selectedItem?.actionDetail || "Navigate to this setting"}
            </Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f3e5f5",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6a1b9a",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#8e24aa",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  cardLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  cardDesc: { fontSize: 13, color: "#e1bee7", marginTop: 2 },
  cardButton: {
    backgroundColor: "#6a1b9a",
    padding: 6,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: "#6a1b9a", marginBottom: 12 },
  modalDetail: { fontSize: 16, color: "#333", marginBottom: 20, lineHeight: 22 },
  modalButton: {
    backgroundColor: "#8e24aa",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
