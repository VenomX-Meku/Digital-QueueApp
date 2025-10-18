import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function QueueHistoryScreen() {
  const history = [
    { id: "1", ticket: "A001", type: "Normal", date: "Oct 1, 2025" },
    { id: "2", ticket: "V002", type: "VIP", date: "Oct 2, 2025" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Queue History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ticket}>Ticket: {item.ticket}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: { backgroundColor: "#27c7d2", padding: 10, borderRadius: 8, marginBottom: 10 },
  ticket: { fontWeight: "bold", fontSize: 16 },
});
