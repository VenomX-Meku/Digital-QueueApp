// app/screens/TransactionScreen.tsx
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

type TransactionItem = {
  id: string;
  transactionId: string;
  type: "Credit" | "Debit";
  amount: string;
  date: string;
  status: "Success" | "Pending" | "Failed";
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  detail: string;
};

export default function TransactionScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);

  const transactions: TransactionItem[] = [
    {
      id: "1",
      transactionId: "T1001",
      type: "Credit",
      amount: "$150",
      date: "Oct 1, 2025",
      status: "Success",
      icon: "cash-plus",
      detail: "Transaction T1001: $150 credited on Oct 1, 2025. Status: Success",
    },
    {
      id: "2",
      transactionId: "T1002",
      type: "Debit",
      amount: "$50",
      date: "Oct 2, 2025",
      status: "Pending",
      icon: "cash-minus",
      detail: "Transaction T1002: $50 debited on Oct 2, 2025. Status: Pending",
    },
    {
      id: "3",
      transactionId: "T1003",
      type: "Credit",
      amount: "$200",
      date: "Oct 3, 2025",
      status: "Failed",
      icon: "cash-refund",
      detail: "Transaction T1003: $200 credited on Oct 3, 2025. Status: Failed",
    },
    {
      id: "4",
      transactionId: "T1004",
      type: "Debit",
      amount: "$75",
      date: "Oct 4, 2025",
      status: "Success",
      icon: "bank-transfer",
      detail: "Transaction T1004: $75 debited on Oct 4, 2025. Status: Success",
    },
    {
      id: "5",
      transactionId: "T1005",
      type: "Credit",
      amount: "$120",
      date: "Oct 5, 2025",
      status: "Pending",
      icon: "cash-plus",
      detail: "Transaction T1005: $120 credited on Oct 5, 2025. Status: Pending",
    },
    {
      id: "6",
      transactionId: "T1006",
      type: "Debit",
      amount: "$60",
      date: "Oct 6, 2025",
      status: "Success",
      icon: "cash-minus",
      detail: "Transaction T1006: $60 debited on Oct 6, 2025. Status: Success",
    },
  ];

  const openModal = (item: TransactionItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "#2e7d32";
      case "Pending":
        return "#f9a825";
      case "Failed":
        return "#c62828";
      default:
        return "#000";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}
            activeOpacity={0.85}
            onPress={() => openModal(item)}
          >
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color="#fff"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.transactionId}>{item.transactionId}</Text>
            </View>
            <Text style={styles.cardText}>Type: {item.type}</Text>
            <Text style={styles.cardText}>Amount: {item.amount}</Text>
            <Text style={styles.cardText}>Date: {item.date}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
              Status: {item.status}
            </Text>
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
            <Text style={styles.modalTitle}>{selectedItem?.transactionId}</Text>
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
  container: { flex: 1, padding: 16, backgroundColor: "#e3f2fd" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1565c0",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1976d2",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  transactionId: { fontSize: 18, fontWeight: "700", color: "#fff" },
  cardText: { fontSize: 14, color: "#bbdefb" },
  status: { fontSize: 14, fontWeight: "700" },
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
    color: "#1565c0",
  },
  modalDetail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: "#1976d2",
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
