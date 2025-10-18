// app/screens/FinanceScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type FinanceItem = {
  id: number;
  title: string;
  description: string;
  amount: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  detail: string;
  color: string;
};

export default function FinanceScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FinanceItem | null>(null);

  const finances: FinanceItem[] = [
    {
      id: 1,
      title: "Total Income",
      description: "All earnings from queues",
      amount: "$1,250",
      icon: "cash-multiple",
      detail: "Total income received from all completed queues this month.",
      color: "#4caf50",
    },
    {
      id: 2,
      title: "Total Expenses",
      description: "Money spent on operations",
      amount: "$430",
      icon: "cart-outline",
      detail: "Total operational expenses incurred this month.",
      color: "#f44336",
    },
    {
      id: 3,
      title: "Profit",
      description: "Net earnings after expenses",
      amount: "$820",
      icon: "trending-up",
      detail: "Profit calculated as Total Income minus Total Expenses.",
      color: "#2196f3",
    },
    {
      id: 4,
      title: "Pending Payments",
      description: "Unsettled client payments",
      amount: "$210",
      icon: "clock-outline",
      detail: "Pending payments from clients that are yet to be collected.",
      color: "#ff9800",
    },
    {
      id: 5,
      title: "Refunds",
      description: "Money returned to clients",
      amount: "$50",
      icon: "cash-refund",
      detail: "Total refunds issued to clients this month.",
      color: "#9c27b0",
    },
    {
      id: 6,
      title: "VIP Revenue",
      description: "Income from VIP service",
      amount: "$400",
      icon: "star-circle-outline",
      detail: "Revenue from VIP queue priority clients.",
      color: "#ff5722",
    },
    {
      id: 7,
      title: "Investments",
      description: "Funds invested in growth plans",
      amount: "$600",
      icon: "bank-outline",
      detail: "Total funds invested in business growth and expansion.",
      color: "#795548",
    },
    // Additional 7 useful features for problem solving
    {
      id: 8,
      title: "Savings",
      description: "Reserved funds for future needs",
      amount: "$300",
      icon: "piggy-bank-outline",
      detail: "Funds set aside as savings for operational backup.",
      color: "#00bcd4",
    },
    {
      id: 9,
      title: "Loan Status",
      description: "Current loans and repayments",
      amount: "$1,000",
      icon: "bank-transfer",
      detail: "Details of active loans and repayment schedules.",
      color: "#607d8b",
    },
    {
      id: 10,
      title: "Tax Summary",
      description: "Taxes paid this month",
      amount: "$120",
      icon: "file-document-outline",
      detail: "Summary of taxes paid for this month with breakdown.",
      color: "#c2185b",
    },
    {
      id: 11,
      title: "Cash Flow",
      description: "Inflow vs Outflow analysis",
      amount: "$1,400",
      icon: "swap-horizontal",
      detail: "Analysis of cash flow to manage daily operations.",
      color: "#3f51b5",
    },
    {
      id: 12,
      title: "Pending Refunds",
      description: "Client refunds to be processed",
      amount: "$30",
      icon: "timer-sand",
      detail: "Refunds requested by clients and awaiting approval.",
      color: "#ff6f00",
    },
    {
      id: 13,
      title: "Alerts & Notifications",
      description: "Important finance alerts",
      amount: "3 alerts",
      icon: "bell-outline",
      detail: "Critical notifications regarding payments, refunds, or VIP queues.",
      color: "#795548",
    },
  ];

  const openModal = (item: FinanceItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Finance Dashboard</Text>

      {finances.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.card, { backgroundColor: item.color }]}
          activeOpacity={0.85}
          onPress={() => openModal(item)}
        >
          <View style={styles.cardHeader}>
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
            <Text style={styles.cardAmount}>{item.amount}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalDetail}>{selectedItem?.detail}</Text>
            <Text style={styles.modalAmount}>{selectedItem?.amount}</Text>
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
    backgroundColor: "#f1f8e9",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#33691e",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  cardDesc: { fontSize: 13, color: "#e0f7fa", marginTop: 2 },
  cardAmount: { fontSize: 18, fontWeight: "700", color: "#fff" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
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
    color: "#33691e",
    marginBottom: 12,
  },
  modalDetail: { fontSize: 16, color: "#333", marginBottom: 12, lineHeight: 22 },
  modalAmount: { fontSize: 18, fontWeight: "700", color: "#33691e", marginBottom: 20 },
  modalButton: {
    backgroundColor: "#558b2f",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
