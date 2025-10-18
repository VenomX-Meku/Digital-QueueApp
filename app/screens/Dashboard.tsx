// app/components/Dashboard.tsx
import React from "react";
import { ScrollView, Text, Button, Alert, StyleSheet, View } from "react-native";

export default function Dashboard() {
  const [cards, setCards] = React.useState([
    { title: "Savings", amount: 200, type: "Income" },
    { title: "Bills", amount: 100, type: "Expense" },
  ]);
  const [total, setTotal] = React.useState(100);

  const addCard = (title: string, amount: number, type: string) => {
    const newCards = [...cards, { title, amount, type }];
    setCards(newCards);
    setTotal(total + amount);
  };

  const editCard = (index: number, title: string, amount: number, type: string) => {
    const updated = [...cards];
    updated[index] = { title, amount, type };
    setCards(updated);
  };

  const deleteCard = (index: number) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
  };

  const handleCardPress = (card: any, index: number) => {
    Alert.alert(
      card.title,
      `Amount: $${card.amount}`,
      [
        { text: "Edit", onPress: () => editCard(index, card.title, card.amount + 50, card.type) },
        { text: "Delete", onPress: () => deleteCard(index), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Finance Dashboard</Text>
      <Button title="Add Investment $150" onPress={() => addCard("Investment", 150, "Investment")} />

      {cards.length > 0 ? (
        cards.map((card, index) => (
          <View key={index} style={styles.card} onTouchEnd={() => handleCardPress(card, index)}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text>${card.amount}</Text>
            <Text style={{ color: "#888" }}>{card.type}</Text>
          </View>
        ))
      ) : (
        <Text style={{ marginTop: 16, fontSize: 16 }}>No cards yet.</Text>
      )}

      <Text style={styles.total}>Total: ${total}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  total: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
});
