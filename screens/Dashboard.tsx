import React, { useContext } from "react";
import { View, Text, Alert, ScrollView, Button } from "react-native";
import MoneyCard from "../components/MoneyCard";
import { MoneyContext } from "../context/MoneyContext";

export default function Dashboard() {
  const context = useContext(MoneyContext);
  if (!context) return null;

  const { cards, total, addCard, editCard, deleteCard } = context;

  const handleCardPress = (title: string, amount: number, index: number) => {
    Alert.alert(
      `${title}`,
      `Amount: $${amount}`,
      [
        { text: "Edit", onPress: () => editCard(index, title, amount + 50, "Investment") },
        { text: "Delete", onPress: () => deleteCard(index), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 12 }}>Dashboard</Text>

      <Button title="Add Investment $150" onPress={() => addCard("Investment", 150, "Investment")} />

      {cards.map((card, index) => (
        <MoneyCard
          key={index}
          title={card.title}
          amount={card.amount}
          onPress={() => handleCardPress(card.title, card.amount, index)}
        />
      ))}

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Total: ${total}
      </Text>
    </ScrollView>
  );
}
