// app/screens/QueueHistoryScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HistoryItem = {
  id: string;
  ticket: string;
  type: string;
  date: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  detail: string;
};

export default function QueueHistoryScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const history: HistoryItem[] = [
    {
      id: "1",
      ticket: "A001",
      type: "Normal",
      date: "Oct 1, 2025",
      icon: "ticket-outline",
      detail: "Ticket A001\nType: Normal\nDate: Oct 1, 2025\nQueue completed successfully.",
    },
    {
      id: "2",
      ticket: "V002",
      type: "VIP",
      date: "Oct 2, 2025",
      icon: "star-outline",
      detail: "Ticket V002\nType: VIP\nDate: Oct 2, 2025\nPriority service used.",
    },
    {
      id: "3",
      ticket: "A003",
      type: "Normal",
      date: "Oct 3, 2025",
      icon: "ticket-confirmation-outline",
      detail: "Ticket A003\nType: Normal\nDate: Oct 3, 2025\nQueue completed successfully.",
    },
    {
      id: "4",
      ticket: "V004",
      type: "VIP",
      date: "Oct 4, 2025",
      icon: "star-circle-outline",
      detail: "Ticket V004\nType: VIP\nDate: Oct 4, 2025\nPriority service used.",
    },
    {
      id: "5",
      ticket: "A005",
      type: "Normal",
      date: "Oct 5, 2025",
      icon: "ticket-percent-outline",
      detail: "Ticket A005\nType: Normal\nDate: Oct 5, 2025\nQueue completed successfully.",
    },
    {
      id: "6",
      ticket: "V006",
      type: "VIP",
      date: "Oct 6, 2025",
      icon: "star-box-outline",
      detail: "Ticket V006\nType: VIP\nDate: Oct 6, 2025\nPriority service used.",
    },
    {
      id: "7",
      ticket: "A007",
      type: "Normal",
      date: "Oct 7, 2025",
      icon: "ticket-outline",
      detail: "Ticket A007\nType: Normal\nDate: Oct 7, 2025\nQueue completed successfully.",
    },
  ];

  const openModal = (item: HistoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Queue History</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => openModal(item)}
          >
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color="#fff"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.ticket}>{item.ticket}</Text>
            </View>
            <Text style={styles.cardText}>Type: {item.type}</Text>
            <Text style={styles.cardText}>Date: {item.date}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem?.ticket}</Text>
            <Text style={styles.modalDetail}>{selectedItem?.detail}</Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#e8f5e9" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1b5e20",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#43a047",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  ticket: { fontSize: 18, fontWeight: "700", color: "#fff" },
  cardText: { fontSize: 14, color: "#c8e6c9" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1b5e20",
  },
  modalDetail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: "#43a047",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
