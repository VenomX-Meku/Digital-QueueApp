// app/screens/SupportScreen.tsx
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

export default function SupportScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const features = [
    {
      id: 1,
      title: "FAQ",
      description: "Frequently asked questions about queue and app usage.",
      detail: "Q: How to join a queue?\nA: Click on 'Queue' in the dashboard.\n\nQ: How to cancel?\nA: Go to 'Queue History' and select cancel.",
    },
    {
      id: 2,
      title: "Contact Support",
      description: "Get in touch with our support team via call or message.",
      detail: "Call: +1 234 567 890\nEmail: support@digitalqueueapp.com",
    },
    {
      id: 3,
      title: "Report Issue",
      description: "Report a problem with queue or payment.",
      detail: "Submit issues directly through app. Our team will respond within 24 hours.",
    },
    {
      id: 4,
      title: "Live Chat",
      description: "Chat live with a support agent for instant help.",
      detail: "Live chat available from 8 AM to 8 PM. Click 'Chat Now' to connect.",
    },
    {
      id: 5,
      title: "Feedback",
      description: "Share your thoughts and help us improve.",
      detail: "Your feedback matters! Submit via 'Feedback' section, and we'll review it.",
    },
    {
      id: 6,
      title: "Queue Tips",
      description: "Tips to save time and manage your queue efficiently.",
      detail: "1. Join early to avoid wait\n2. Check Queue History regularly\n3. Use VIP service for priority access",
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
      <Text style={styles.header}>Help & Support</Text>

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

      {/* Modal for feature details */}
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
    backgroundColor: "#fbe9e7", // warm coral background
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#bf360c",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ff7043",
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
    color: "#ffe0b2",
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
    color: "#bf360c",
  },
  modalDetail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: "#ff7043",
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
