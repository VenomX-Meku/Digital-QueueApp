import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { QueueData } from "../context/MoneyContext";

const QueueCard = ({ ticket, position, type }: QueueData) => (
  <View style={[styles.card, { backgroundColor: type === "VIP" ? "#ff9f1c" : "#666104" }]}>
    <Text style={styles.ticket}>Ticket: {ticket}</Text>
    <Text style={styles.position}>Position: {position}</Text>
    <Text style={styles.type}>Type: {type}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 16, margin: 8, borderRadius: 8 },
  ticket: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  position: { fontSize: 14, color: "#fff" },
  type: { fontSize: 14, color: "#fff", fontStyle: "italic" },
});

export default QueueCard;
