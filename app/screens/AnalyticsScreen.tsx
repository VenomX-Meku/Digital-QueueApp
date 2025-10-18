// app/screens/AnalyticsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

export default function AnalyticsScreen() {
  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  // Features relevant to a digital queue app
  const features = [
    {
      id: 1,
      title: "Queue Summary",
      description: "See total tickets, active queues, and average wait time.",
      detail: "Total tickets: 120\nActive queues: 5\nAverage wait: 15 min",
    },
    {
      id: 2,
      title: "Revenue Overview",
      description: "Track revenue generated from priority and VIP services.",
      detail: "VIP: $500\nNormal: $1200\nTotal: $1700",
    },
    {
      id: 3,
      title: "Customer Activity",
      description: "Monitor how often clients join queues and peak hours.",
      detail: "Peak hour: 2 PM - 4 PM\nFrequent users: 45",
    },
    {
      id: 4,
      title: "Service Efficiency",
      description: "Evaluate staff performance and average service time.",
      detail: "Avg service time: 10 min\nFastest: 5 min\nSlowest: 20 min",
    },
    {
      id: 5,
      title: "VIP Insights",
      description: "Analyze VIP queue usage and revenue impact.",
      detail: "VIP tickets: 30\nVIP revenue: $500",
    },
  ];

  const openModal = (feature: any) => {
    setSelectedFeature(feature);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedFeature(null);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Analytics & Reports</Text>

      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => openModal(feature)}
        >
          <Text style={styles.cardTitle}>{feature.title}</Text>
          <Text style={styles.cardDesc}>{feature.description}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for feature detail */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedFeature?.title}</Text>
            <Text style={styles.modalDetail}>{selectedFeature?.detail}</Text>
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
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#e0f7fa", // light teal background
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#006064",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#00acc1",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#b2ebf2",
  },
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
    color: "#006064",
  },
  modalDetail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: "#00acc1",
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
