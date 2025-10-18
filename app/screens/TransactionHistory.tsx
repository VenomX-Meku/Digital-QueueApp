import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function TransactionScreen() {
  const transactions = [
    { id: "1", title: "Investment", amount: 150, type: "Income" },
    { id: "2", title: "Electric Bill", amount: -60, type: "Expense" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={{ color: item.amount < 0 ? "red" : "green" }}>
              ${item.amount}
            </Text>
            <Text>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: "bold" },
});
