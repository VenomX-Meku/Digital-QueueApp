import React, { useContext } from "react";
import { Text, Button, Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ updated import
import { MoneyProvider, MoneyContext } from "./context/MoneyContext";
import MoneyCard from "./components/MoneyCard";
import QueueIndex from "./app/index";

export default function App() {
  return (
    <MoneyProvider>
      <MainApp />
    </MoneyProvider>
  );
}

function MainApp() {
  const context = useContext(MoneyContext);
  if (!context) return null;

  const { cards, addCard, editCard, deleteCard, total, totalByType } = context;

  const handleCardPress = (title: string, amount: number, index: number) => {
    Alert.alert(
      `${title}`,
      `You pressed ${title} of $${amount}`,
      [
        { text: "Edit", onPress: () => editCard(index, title, amount + 50, "Investment") },
        { text: "Delete", onPress: () => deleteCard(index), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ⚙️ Removed ScrollView to avoid FlatList nesting warning */}
      <View style={styles.container}>
        <Text style={styles.header}>Finance & Queue App</Text>

        <Button
          title="Add New Card (Investment $150)"
          onPress={() => addCard("Investment", 150, "Investment")}
        />

        {cards.map((card, index) => (
          <MoneyCard
            key={index}
            title={card.title}
            amount={card.amount}
            onPress={() => handleCardPress(card.title, card.amount, index)}
          />
        ))}

        <Text style={styles.total}>Total: ${total}</Text>
        <Text style={styles.subtotal}>Total Income: ${totalByType("Income")}</Text>
        <Text style={styles.subtotal}>Total Expenses: ${totalByType("Expense")}</Text>
        <Text style={styles.subtotal}>Total Savings: ${totalByType("Savings")}</Text>
        <Text style={styles.subtotal}>Total Investments: ${totalByType("Investment")}</Text>

        <Text style={styles.queueHeader}>Queue System</Text>

        {/* ✅ QueueIndex component */}
        <QueueIndex />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 16 },
  subtotal: { fontSize: 16, marginBottom: 4 },
  queueHeader: { fontSize: 22, fontWeight: "bold", marginVertical: 12 },
});
